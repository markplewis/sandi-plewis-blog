// TODO: why am I getting the following error when this export does exist?
// Module '"apca-w3"' has no exported member 'fontLookupAPCA'.
// @ts-ignore
import { calcAPCA, fontLookupAPCA } from "apca-w3";
import Color from "colorjs.io";

// Simple color transformation functions that we could use instead of colorjs.io:
// https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-hsl

// For dark text on light backgrounds, and the text is 24px or smaller, the text should be #000000
// See: https://github.com/Myndex/SAPC-APCA/discussions/64

// Mock colorjs.io instances
const black = { hsl: { h: 0, s: 0, l: 0 } };
const white = { hsl: { h: 0, s: 0, l: 100 } };

const blackRGB = "rgb(0% 0% 0%)";
const whiteRGB = "rgb(100% 100% 100%)";

/**
 * Utility function to safely return a color's hue value, since it may be `NaN`
 * if the color is achromatic or fully desaturated (i.e. greyscale)
 * @param {Number|NaN} h - Hue
 * @returns {Number} Hue value or zero
 */
function getHue(h) {
  return !h || Number.isNaN(h) ? 0 : h;
}

/**
 * Utility function to safely return a color's saturation value, since it may be `NaN`
 * if the color is achromatic or fully desaturated (i.e. greyscale)
 * @param {Number|NaN} s - Saturation
 * @returns {Number} Saturation value or zero
 */
function getSaturation(s) {
  return !s || Number.isNaN(s) ? 0 : s;
}

/**
 * Return whichever color required fewer iterations to lighten or darken
 * (i.e. the color that was transformed the least)
 * @param {Object} colorA - Adjusted color object with iteration count property, etc.
 * @param {Object} colorB - Adjusted color object with iteration count property, etc.
 * @returns {Object} One of the two color objects that were supplied as arguments
 */
function findBestAdjustedColor(colorA, colorB) {
  let bestColor;
  if (
    (colorA.limitReached && colorB.limitReached) ||
    (!colorA.limitReached && !colorB.limitReached)
  ) {
    bestColor = colorA.iterations <= colorB.iterations ? colorA : colorB;
  } else if (colorA.limitReached) {
    bestColor = colorB;
  } else if (colorB.limitReached) {
    bestColor = colorA;
  }
  return bestColor;
}

/**
 * Calculate color contrast.
 * APCA reports lightness contrast as an Lc value from Lc 0 to Lc 106 for dark text on a light
 * background, and Lc 0 to Lc -108 for light text on a dark background (dark mode). The minus
 * sign merely indicates negative contrast, which means light text on a dark background.
 * @see https://www.myndex.com/APCA/
 * @param {Object} fgColor - colorjs.io instance or mock object with HSL properties
 * @param {Object} bgColor - colorjs.io instance or mock object with HSL properties
 * @returns {Number} The APCA readability contrast (Lc value)
 */
function getContrast(fgColor, bgColor) {
  return Number(
    calcAPCA(
      `hsl(${getHue(fgColor.hsl.h)} ${getSaturation(fgColor.hsl.s)}% ${fgColor.hsl.l}%)`,
      `hsl(${getHue(bgColor.hsl.h)} ${getSaturation(bgColor.hsl.s)}% ${bgColor.hsl.l}%)`
    )
  );
}

/**
 * Determine which foreground text color (white or black) has a higher APCA readability contrast
 * (Lc value) against the supplied background color
 * @param {Object} color - colorjs.io instance or mock object with HSL properties
 * @returns {Number} The APCA readability contrast (Lc value)
 */
function getHighestContrast(color) {
  const whiteContrast = getContrast(white, color);
  const blackContrast = getContrast(black, color);
  return Math.abs(whiteContrast) > Math.abs(blackContrast) ? whiteContrast : blackContrast;
}

/**
 * If white foreground text over the provided background color has a higher APCA readability
 * contrast (Lc value) than black text, keep darkening the background color until `fontLookupAPCA`
 * returns a font size smaller than or equal to the desired size, for the desired font weight.
 * Otherwise, keep lightening the background color until the desired outcome is achieved.
 * @param {Object} fgColor - colorjs.io instance or mock object with HSL properties
 * @param {Object} bgColor - colorjs.io instance or mock object with HSL properties
 * @param {Boolean} darkenBg - Whether to progressively darken or lighten the background color
 */
function adjustBackgroundColor(fgColor, bgColor, darkenBg, targetFontSizes, iterations = 0) {
  // if (iterations === 0) {
  //   console.log("Initial", { h: bgColor.hsl.h, s: bgColor.hsl.s, l: bgColor.hsl.l });
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
    // console.log("Final", {
    //   h: bgColor.hsl.h,
    //   s: bgColor.hsl.s,
    //   l: bgColor.hsl.l,
    //   contrast,
    //   iterationCount
    // });
    // if (limitReached) {
    //   console.warn("Limit reached");
    // }
    return {
      fgColor,
      bgColor,
      contrast,
      iterations: iterationCount,
      limitReached
    };
  }
  return adjustBackgroundColor(fgColor, bgColor, darkenBg, targetFontSizes, iterationCount);
}

// Criteria which must be fulfilled in order for a color to be considered accessible by APCA
// standards. This will vary by use case, throughout different parts of the website, because:
// |
// | "The APCA generates a lightness/darkness contrast value based on a minimum font size and color
// | pair, and this value is perceptually based: that is, regardless of how light or dark the two
// | colors are, a contrast value of Lc 60 represents the same perceived readability contrast."
// |
// | "The APCA also has an optional lookup table to associate font size and weight to the
// | readability contrast (Lc value)."
// |
// See: https://git.apcacontrast.com/documentation/WhyAPCA
// TODO: possibly add more targets for different use cases?

const targetFontSizesDefault = [
  {
    // Meta text (Open Sans font)
    weight: 400,
    size: 16 // px
  }
  // Only first size/weight is required because second one has lower contrast requirements
  // {
  //   // Date text (Literata font)
  //   weight: 700,
  //   size: 28 // px
  // }
];

/**
 * Lighten/darken the primary color until it fulfills all of the provided APCA accessibility
 * requirements. Whichever one of the generated colors required the least amount of transformation
 * will be selected and returned. The secondary color doesn't need to be transformed because text
 * will never be placed over top of it (a manually-enforced design constraint).
 * @param {Object} color - colorjs.io instance or mock object with HSL properties
 * @param {Array} targetFontSizes - Target font weights and sizes for APCA
 * @returns {Object} Transformed color with contrast value
 */
function adjustColorContrast(color, targetFontSizes) {
  // Clone colorjs.io instances (important!)
  const color1 = new Color(color);
  const color2 = new Color(color);

  // White text on dark background
  // (darken the color and assume the foreground text will be white)
  const whiteForeground = adjustBackgroundColor(white, color1, true, targetFontSizes);

  // Black text on light background
  // (lighten the color and assume the foreground text will be black)
  const blackForeground = adjustBackgroundColor(black, color2, false, targetFontSizes);

  // Select whichever color required fewer iterations to lighten or darken
  // (i.e. the color that was transformed the least)
  const bestColor = findBestAdjustedColor(blackForeground, whiteForeground);

  return {
    color: bestColor.bgColor,
    contrast: bestColor.contrast
  };
}

/**
 * Fetch page colors from Sanity document and transform primary color until it's APCA accessible
 * @see https://git.apcacontrast.com/documentation/WhyAPCA
 * @param {Object} data - Sanity document
 * @param {Array} targetFontSizes - Target font weights and sizes for APCA
 * @returns {Object} "primary" and "secondary" page colors plus a string of CSS `body` styles
 */
export function getPageColors(data, targetFontSizes = targetFontSizesDefault) {
  const pageColors = data?.image?.pageColors;

  if (!pageColors || !pageColors?.primary || !pageColors?.secondary) {
    return "";
  }
  // Original colors
  const primaryOriginal = new Color(
    `rgb(${pageColors.primary.r}% ${pageColors.primary.g}% ${pageColors.primary.b}%)`
  );
  const secondaryOriginal = new Color(
    `rgb(${pageColors.secondary.r}% ${pageColors.secondary.g}% ${pageColors.secondary.b}%)`
  );

  // Clone the colorjs.io instances (important!)
  const primaryCloned = new Color(primaryOriginal);
  const secondarCloned = new Color(secondaryOriginal);

  // Adjusted colors
  const primaryAdjusted = adjustColorContrast(primaryCloned, targetFontSizes);
  const secondaryAdjusted = adjustColorContrast(secondarCloned, targetFontSizes);

  const pageColorsAdjusted = {
    primary: {
      // Convert colorjs.io RGB values into percentages
      r: primaryAdjusted.color.srgb.r * 100,
      g: primaryAdjusted.color.srgb.g * 100,
      b: primaryAdjusted.color.srgb.b * 100,
      contrast: primaryAdjusted.contrast
    },
    primaryOriginal: {
      r: primaryOriginal.srgb.r * 100,
      g: primaryOriginal.srgb.g * 100,
      b: primaryOriginal.srgb.b * 100,
      contrast: getHighestContrast(primaryOriginal)
    },
    secondary: {
      r: secondaryAdjusted.color.srgb.r * 100,
      g: secondaryAdjusted.color.srgb.g * 100,
      b: secondaryAdjusted.color.srgb.b * 100,
      contrast: secondaryAdjusted.contrast
    },
    secondaryOriginal: {
      r: secondaryOriginal.srgb.r * 100,
      g: secondaryOriginal.srgb.g * 100,
      b: secondaryOriginal.srgb.b * 100,
      contrast: getHighestContrast(secondaryOriginal)
    }
  };

  // Short variable names for ease of use, below
  const p = pageColorsAdjusted.primary;
  const s = pageColorsAdjusted.secondary;

  const pO = pageColorsAdjusted.primaryOriginal;
  const sO = pageColorsAdjusted.secondaryOriginal;

  return {
    colors: pageColorsAdjusted,
    styles: /* css */ `
      body {
        /* Primary */
        --page-color-primary: rgb(${p.r}% ${p.g}% ${p.b}%);
        --page-color-primary-diluted: rgb(${p.r}% ${p.g}% ${p.b}% / 10%);
        --page-color-primary-text: ${p.contrast < 0 ? whiteRGB : blackRGB};
        /* Primary original */
        --page-color-primary-orig: rgb(${pO.r}% ${pO.g}% ${pO.b}%);
        --page-color-primary-orig-diluted: rgb(${pO.r}% ${pO.g}% ${pO.b}%) / 10%);
        --page-color-primary-orig-text: ${pO.contrast < 0 ? whiteRGB : blackRGB};
        /* Secondary */
        --page-color-secondary: rgb(${s.r}% ${s.g}% ${s.b}%);
        --page-color-secondary-diluted: rgb(${s.r}% ${s.g}% ${s.b}% / 10%);
        --page-color-secondary-text: ${s.contrast < 0 ? whiteRGB : blackRGB};
        /* Secondary original */
        --page-color-secondary-orig: rgb(${sO.r}% ${sO.g}% ${sO.b}%);
        --page-color-secondary-orig-diluted: rgb(${sO.r}% ${sO.g}% ${sO.b}% / 10%);
        --page-color-secondary-orig-text: ${sO.contrast < 0 ? whiteRGB : blackRGB};
      }
    `
  };
}

// TODO: return something like the following instead?
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
