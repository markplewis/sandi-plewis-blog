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
export function RGBToHSL(color) {
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

/**
 * Fetches color palette data from a given Sanity document
 * @param {Object} doc - A Sanity document (https://www.sanity.io/docs/document-type)
 * @returns {Object|null} in format: {primaryHex: "", secondaryHex: ""}
 */
export function getDocumentColors(doc) {
  // See: https://www.sanity.io/docs/image-metadata#5bb0c7e96f42
  const palette = doc?.image?.palette;
  const selectedSwatchName = doc?.colorPalette ?? "darkVibrant"; // Chosen by user
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
  // adjustColorContrast(documentColors); // TODO: delete this line later (testing now)
  return documentColors;
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

export function adjustColorContrast({ primaryHex, secondaryHex }) {
  // const primaryHSL = colorToHSL(colorParsley(primaryHex));
  // const secondaryHSL = colorToHSL(colorParsley(secondaryHex));

  const contrastValues = {
    whiteOnPrimary: calcAPCA("#fff", primaryHex),
    whiteOnSecondary: calcAPCA("#fff", secondaryHex),
    blackOnPrimary: calcAPCA("#000", primaryHex),
    blackOnSecondary: calcAPCA("#000", secondaryHex)
  };
  const fontSizes = {
    whiteOnPrimary: fontLookupAPCA(contrastValues.whiteOnPrimary),
    whiteOnSecondary: fontLookupAPCA(contrastValues.whiteOnSecondary),
    blackOnPrimary: fontLookupAPCA(contrastValues.blackOnPrimary),
    blackOnSecondary: fontLookupAPCA(contrastValues.blackOnSecondary)
  };
  console.log("fontSizes", fontSizes); // 4 and 7
  // fontLookupAPCA()
}
