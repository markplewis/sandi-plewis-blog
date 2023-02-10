// TODO: why am I getting the following error when this export does exist?
// Module '"apca-w3"' has no exported member 'fontLookupAPCA'.
// @ts-ignore
import { calcAPCA, fontLookupAPCA } from "apca-w3";
import Color from "colorjs.io";

// https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-hsl
// https://www.sarasoueidan.com/blog/hex-rgb-to-hsl/#hsl-and-color-harmonies

// For dark text on light backgrounds, and the text is 24px or smaller, the text should be #000000
// See: https://github.com/Myndex/SAPC-APCA/discussions/64

// Mock colorjs.io instances
const white = { hsl: { h: 0, s: 0, l: 100 } };
// const black = { hsl: { h: 0, s: 0, l: 0 } };

// Hue and saturation may be `NaN` if the color is achromatic or fully desaturated (i.e. greyscale)
function getHue(h) {
  return !h || Number.isNaN(h) ? 0 : h;
}

function getSaturation(s) {
  return !s || Number.isNaN(s) ? 0 : s;
}

// function findBestColorCombo(blackFgColor, whiteFgColor) {
//   let bestColor;
//   if (
//     (whiteFgColor.limitReached && blackFgColor.limitReached) ||
//     (!whiteFgColor.limitReached && !blackFgColor.limitReached)
//   ) {
//     bestColor = whiteFgColor.iterations <= blackFgColor.iterations ? whiteFgColor : blackFgColor;
//   } else if (blackFgColor.limitReached) {
//     bestColor = whiteFgColor;
//   } else if (whiteFgColor.limitReached) {
//     bestColor = blackFgColor;
//   }
//   // console.log("bestColor", bestColor);
//   return bestColor;
// }

/**
 * If light (`#FFF`) text over the background colour has higher contrast than dark (`#000`) text,
 * keep darkening the background color until `fontLookupAPCA` returns a font size smaller than or
 * equal to the desired size, for the desired font weight. Otherwise, keep lightening the
 * background color until we've reached this point.
 * @param {Object} fgColor - colorjs.io instance or mock object with HSL properties
 * @param {Object} bgColor - colorjs.io instance or mock object with HSL properties
 * @param {Boolean} darkenBg - Whether to progressively darken the background color or lighten it
 */
function adjustBackgroundColor(fgColor, bgColor, darkenBg, targetFontSizes, iterations = 0) {
  // if (iterations === 0) {
  //   console.log(`Initial: hsl(${bgColor.hsl.h} ${bgColor.hsl.s}% ${bgColor.hsl.l}%)`);
  // }
  const iterationCount = iterations + 1;
  const currentLightness = parseFloat(bgColor.hsl.l);
  let lightness;
  let limitReached = false;

  // Lighten or darken the target color
  if (darkenBg && currentLightness - 1 >= 0) {
    lightness = currentLightness - 1;
  } else if (!darkenBg && currentLightness + 1 <= 100) {
    lightness = currentLightness + 1;
  } else {
    // Lightness has bottomed out at zero (black) or topped out at 100 (white), so test the contrast
    lightness = currentLightness;
    limitReached = true;
  }
  bgColor.hsl.l = lightness; // Mutate the color

  // APCA reports lightness contrast as an Lc value from Lc 0 to Lc 106 for dark text on a light
  // background, and Lc 0 to Lc -108 for light text on a dark background (dark mode). The minus
  // sign merely indicates negative contrast, which means light text on a dark background.
  // See: https://www.myndex.com/APCA/
  const contrast = calcAPCA(
    `hsl(${getHue(fgColor.hsl.h)} ${getSaturation(fgColor.hsl.s)}% ${fgColor.hsl.l}%)`,
    `hsl(${getHue(bgColor.hsl.h)} ${getSaturation(bgColor.hsl.s)}% ${bgColor.hsl.l}%)`
  );
  const fontSizes = fontLookupAPCA(contrast);

  const passedContrastTest = targetFontSizes.every(size => {
    const fontSize = fontSizes[size.weight / 100];
    // We're assuming that the font size returned by APCA for this font weight represents
    // a minimum value, so it's safe to use font sizes that are larger than this. However,
    // the https://www.myndex.com/APCA/ tool sometimes says "Usage: small body text only".
    return fontSize <= size.size;
  });

  if (passedContrastTest || limitReached) {
    // console.log(`Final: hsl(${bgColor.hsl.h} ${bgColor.hsl.s}% ${bgColor.hsl.l}%)`);
    // console.log(`Final: rgb(${bgColor.rgb.r}, ${bgColor.rgb.g}, ${bgColor.rgb.b})`);
    // console.log("Final:", { coords: bgColor.coords.join(", ") });

    // if (limitReached) {
    //   console.warn("Limit reached");
    // }
    return {
      fgColor,
      bgColor,
      // bgIsDark: darkenBg,
      contrast,
      iterations: iterationCount,
      limitReached
    };
  }
  return adjustBackgroundColor(fgColor, bgColor, darkenBg, targetFontSizes, iterationCount);
}

function adjustColorContrast(colors, targetFontSizes) {
  const { primary, secondary } = colors;

  // Darken the colour and assume the foreground text will be white
  const whiteOnPrimary = adjustBackgroundColor(white, primary, true, targetFontSizes);
  const whiteOnSecondary = adjustBackgroundColor(white, secondary, true, targetFontSizes);

  // let chosenPrimary = whiteOnPrimary;
  // let chosenSecondary = whiteOnSecondary;

  // if (isCustomPalette) {
  //   const primary2 = new Color(primary); // Clone
  //   const secondary2 = new Color(secondary); // Clone

  //   const blackOnPrimary = adjustBackgroundColor(
  //     black,
  //     primary2,
  //     false,
  //     targetFontSizes,
  //   );
  //   const blackOnSecondary = adjustBackgroundColor(
  //     black,
  //     secondary2,
  //     false,
  //     targetFontSizes,
  //   );
  //   // Select whichever color required fewer iterations to lighten or darken
  //   // (i.e. the color that was transformed the least)
  //   chosenPrimary = findBestColorCombo(blackOnPrimary, whiteOnPrimary);
  //   chosenSecondary = findBestColorCombo(blackOnSecondary, whiteOnSecondary);
  //   // chosenPrimary = whiteOnPrimary;
  //   // chosenSecondary = blackOnSecondary;
  // }

  // return {
  //   primary: chosenPrimary.bgColor,
  //   secondary: chosenSecondary.bgColor
  // };

  return {
    primary: whiteOnPrimary.bgColor,
    secondary: whiteOnSecondary.bgColor
  };
}

// TODO: return the following
// (see https://www.npmjs.com/package/apca-w3)
/*
{
  primary: {
    original: color,
    w100: {
      s12: color,
      s14: color,
      s16: color,
      ...etc
    },
    w200: {
      s12: color,
      s14: color,
      s16: color,
      ...etc
    },
    ...etc
  },
  secondary: {...}
}
*/

/**
 * TODO
 * @param {Object} pageColors
 * @returns {Object}
 */
export function getPageColors(pageColors = {}) {
  if (!pageColors?.primary || !pageColors?.secondary) {
    return "";
  }
  // Convert into colorjs.io instances
  const colors = {
    primary: new Color(
      `rgb(${pageColors.primary.r}% ${pageColors.primary.g}% ${pageColors.primary.b}%)`
    ),
    secondary: new Color(
      `rgb(${pageColors.secondary.r}% ${pageColors.secondary.g}% ${pageColors.secondary.b}%)`
    )
  };

  const targetFontSizes = [
    {
      // Meta text (Open Sans font)
      weight: 400,
      size: 16 // px
    },
    {
      // Date text (Literata font)
      weight: 700,
      size: 28 // px
    }
  ];
  const { primary, secondary } = adjustColorContrast(colors, targetFontSizes);

  const c = {
    primary: {
      // Convert colorjs.io RGB values into percentages
      r: primary.srgb.r * 100,
      g: primary.srgb.g * 100,
      b: primary.srgb.b * 100
      // h: primary.hsl.h,
      // s: primary.hsl.s,
      // l: primary.hsl.l
    },
    secondary: {
      r: secondary.srgb.r * 100,
      g: secondary.srgb.g * 100,
      b: secondary.srgb.b * 100
      // h: secondary.hsl.h,
      // s: secondary.hsl.s,
      // l: secondary.hsl.l
    }
  };
  // console.log("colors", {
  //   original: pageColors,
  //   adjusted: c
  // });
  return {
    colorsOriginal: pageColors,
    colors: c,
    styles: `
      body {
        --page-color-primary: rgb(${c.primary.r}% ${c.primary.g}% ${c.primary.b}%);
        --page-color-primary-diluted: rgb(${c.primary.r}% ${c.primary.g}% ${c.primary.b}% / 10%);
        --page-color-secondary: rgb(${c.secondary.r}% ${c.secondary.g}% ${c.secondary.b}%);
        --page-color-secondary-diluted: rgb(${c.secondary.r}% ${c.secondary.g}% ${c.secondary.b}% / 10%);
      }
    `
  };
}
