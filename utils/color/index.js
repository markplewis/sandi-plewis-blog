// Ignore this error until it's fixed (export actually does exist):
// Module '"apca-w3"' has no exported member 'fontLookupAPCA'.
// @ts-ignore
import { calcAPCA, fontLookupAPCA } from "apca-w3";
import { colorParsley, colorToHex } from "colorparsley";

// https://css-tricks.com/converting-color-spaces-in-javascript/#hex-to-hsl
// https://www.sarasoueidan.com/blog/hex-rgb-to-hsl/#hsl-and-color-harmonies

/**
 * The `colorparsley` package doesn't yet provide this function for us
 * @param {Array} color - A `colorParsley` color array
 * @returns {Object}
 */
function colorToHSL(color) {
  return RGBToHSL({ r: color[0], g: color[1], b: color[2] });
}

/**
 * Converts the provided hex color into HSL format
 * @param {Object} color - RGB color
 * @param {number} color.r - Red value
 * @param {number} color.g - Green value
 * @param {number} color.b - Blue value
 * @returns {Object}
 */
function RGBToHSL(color) {
  // Make r, g, and b fractions of 1
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  // Calculate hue
  if (delta == 0) {
    // No difference
    h = 0;
  } else if (cmax == r) {
    // Red is max
    h = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    // Green is max
    h = (b - r) / delta + 2;
  } else {
    // Blue is max
    h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) {
    h += 360;
  }
  // Calculate lightness
  l = (cmax + cmin) / 2;
  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

function HSLToHex({ h, s, l }) {
  return colorToHex(colorParsley(`hsl(${h}, ${s}%, ${l}%)`));
}

/**
 * Fetches color palette data from a given Sanity document
 * @param {Object} doc - A Sanity document (https://www.sanity.io/docs/document-type)
 * @returns {Object|null} in format: {primaryHex: "", secondaryHex: ""}
 */
export function getDocumentColors(doc, targetFontSizes) {
  // See: https://www.sanity.io/docs/image-metadata#5bb0c7e96f42
  const palette = doc?.image?.palette;
  const selectedSwatchName = doc?.image?.colorPalette ?? "vibrant"; // Chosen by user
  const swatch = palette?.[selectedSwatchName];

  const isSanityPalette = selectedSwatchName !== "custom" && swatch?.background;
  const isCustomPalette =
    selectedSwatchName === "custom" && doc?.primaryColor?.hex && doc?.secondaryColor?.hex;

  let documentColors = null;

  if (isSanityPalette) {
    // Generate complimentary color
    const originalColor = colorParsley(swatch.background);
    const originalHSL = colorToHSL(originalColor);

    const complimentaryColor = colorParsley(
      `hsl(${originalHSL.h + 180}, ${originalHSL.s}%, ${originalHSL.l}%)`
    );
    const complimentaryHex = colorToHex(complimentaryColor);

    documentColors = {
      primaryHex: swatch.background,
      secondaryHex: `#${complimentaryHex}`
    };
  } else if (isCustomPalette) {
    documentColors = {
      primaryHex: doc.primaryColor.hex,
      secondaryHex: doc.secondaryColor.hex
    };
  }
  return adjustColorContrast(documentColors, targetFontSizes);
}

// See: https://github.com/Myndex/apca-w3#new-font-size-array
// ['LcValue',100,200,300,400,500,600,700,800,900]

// TODO: write function that takes desired size and weight, then calculates acceptable text color
// to use, given the background color (for dark text only - light text will always be white)

// const targetSizes = {
//   postPage: {
//     date: {
//       // Literata
//       weight: 700,
//       size: 28 // px
//     },
//     meta: {
//       // Open Sans
//       weight: 400,
//       size: 16 // px
//     }
//   },
//   homePage: {
//     novelTitle: {
//       // Literata
//       weight: 700,
//       size: 36 // px
//     },
//     novelDescription: {
//       // Open Sans
//       weight: 400,
//       size: 16 // px
//     }
//   }
// };

// For dark text on light backgrounds, and the text is 24px or smaller, the text should be #000000
// See: https://github.com/Myndex/SAPC-APCA/discussions/64
const blackHSL = { h: 0, s: 0, l: 0 };
const whiteHSL = { h: 360, s: 100, l: 100 };

function findBestColorCombo(blackFgColor, whiteFgColor) {
  let bestColor;
  if (
    (whiteFgColor.limitReached && blackFgColor.limitReached) ||
    (!whiteFgColor.limitReached && !blackFgColor.limitReached)
  ) {
    bestColor = whiteFgColor.iterations <= blackFgColor.iterations ? whiteFgColor : blackFgColor;
  } else if (blackFgColor.limitReached) {
    bestColor = whiteFgColor;
  } else if (whiteFgColor.limitReached) {
    bestColor = blackFgColor;
  }
  return bestColor;
}

function hexToRGB(color, alpha = 1) {
  const [r, g, b] = colorParsley(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustColorContrast(documentColors, targetFontSizes) {
  const { primaryHex, secondaryHex } = documentColors;
  const primaryHSL = colorToHSL(colorParsley(primaryHex));
  const secondaryHSL = colorToHSL(colorParsley(secondaryHex));

  // TODO: leave colors as-is when they were manually selected within Sanity? (i.e. do not transform)
  const whiteOnPrimary = adjustBackgroundColor(whiteHSL, primaryHSL, true, targetFontSizes);
  const whiteOnSecondary = adjustBackgroundColor(whiteHSL, secondaryHSL, true, targetFontSizes);
  const blackOnPrimary = adjustBackgroundColor(blackHSL, primaryHSL, false, targetFontSizes);
  const blackOnSecondary = adjustBackgroundColor(blackHSL, secondaryHSL, false, targetFontSizes);

  // console.log("contrastValues", {
  //   whiteOnPrimary,
  //   whiteOnSecondary,
  //   blackOnPrimary,
  //   blackOnSecondary
  // });

  // Select whichever color required fewer iterations to lighten or darken
  // (i.e. the color that was transformed the least)
  const bestPrimary = findBestColorCombo(blackOnPrimary, whiteOnPrimary);
  bestPrimary.bgColorTranslucent = hexToRGB(bestPrimary.bgColor, 0.1);

  const bestSecondary = findBestColorCombo(blackOnSecondary, whiteOnSecondary);
  bestSecondary.bgColorTranslucent = hexToRGB(bestSecondary.bgColor, 0.1);

  // TODO: export rgba colours with a 0.1 alpha, for background gradients
  return {
    primary: {
      fgColor: bestPrimary.fgColor,
      bgColor: bestPrimary.bgColor,
      bgColorTranslucent: bestPrimary.bgColorTranslucent
    },
    secondary: {
      fgColor: bestSecondary.fgColor,
      bgColor: bestSecondary.bgColor,
      bgColorTranslucent: bestSecondary.bgColorTranslucent
    },
    css: `
      --color-primary-fg: ${bestPrimary.fgColor};
      --color-primary-bg: ${bestPrimary.bgColor};
      --color-primary-bg-translucent: ${bestPrimary.bgColorTranslucent};
      --color-secondary-fg: ${bestSecondary.fgColor};
      --color-secondary-bg: ${bestSecondary.bgColor};
      --color-secondary-bg-translucent: ${bestSecondary.bgColorTranslucent};
    `
  };
}

/**
 * If light (`#FFF`) text over the background colour has higher contrast than dark (`#000`) text,
 * keep darkening the background color until `fontLookupAPCA` returns a font size smaller than or
 * equal to the desired size, for the desired font weight. Otherwise, keep lightening the
 * background color until we've reached this point.
 * @param {Object} fgColor - HSL color
 * @param {Object} bgColor - HSL color
 * @param {Boolean} darkenBg - Whether to progressively darken the background color or lighten it
 */
function adjustBackgroundColor(fgColor, bgColor, darkenBg, targetFontSizes, iterations = 0) {
  const iterationCount = iterations + 1;
  const currentLightness = parseFloat(bgColor.l);
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
  // APCA reports lightness contrast as an Lc value from Lc 0 to Lc 106 for dark text on a light
  // background, and Lc 0 to Lc -108 for light text on a dark background (dark mode). The minus
  // sign merely indicates negative contrast, which means light text on a dark background.
  // See: https://www.myndex.com/APCA/
  const contrast = calcAPCA(
    `hsl(${fgColor.h}, ${fgColor.s}%, ${fgColor.l}%)`,
    `hsl(${bgColor.h}, ${bgColor.s}%, ${lightness}%)`
  );
  const fontSizes = fontLookupAPCA(contrast);

  const passedContrastTest = targetFontSizes.every(size => {
    const fontSize = fontSizes[size.weight / 100];
    // We're assuming that the font size returned by APCA for this font weight represents
    // a minimum value, so it's safe to use font sizes that are smaller than this. However,
    // the https://www.myndex.com/APCA/ tool sometimes says "Usage: small body text only".
    return fontSize <= size.size;
  });

  const newBgColor = { h: bgColor.h, s: bgColor.s, l: lightness };

  if (passedContrastTest || limitReached) {
    return {
      fgColor: `#${HSLToHex(fgColor)}`,
      bgColor: `#${HSLToHex(newBgColor)}`,
      contrast,
      iterations: iterationCount,
      limitReached
    };
  }
  return adjustBackgroundColor(fgColor, newBgColor, darkenBg, targetFontSizes, iterationCount);
}
