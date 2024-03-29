import type Color from "colorjs.io";

declare namespace SPColors {
  // A Sanity document's `pageColors` field

  interface SampledColor {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
  }

  export interface SampledColors {
    primary: SampledColor;
    secondary: SampledColor;
  }

  // Page colors with added contrast values and generated complimentary colors

  interface SampledColorWithContrast extends SampledColor {
    contrast: number;
  }

  export interface PageColors {
    primary: SampledColorWithContrast;
    secondary: SampledColorWithContrast;
    // TODO: consider deleting these in the future
    primaryOriginal: SampledColorWithContrast;
    secondaryAdjusted: SampledColorWithContrast;
  }

  // Final page colors and CSS styles for the app to use

  export interface PageColorsAndStyles {
    colors: PageColors;
    styles: string;
  }

  //-------------------------------------------------------------------//
  // These types are only used during the color transformation process
  //-------------------------------------------------------------------//

  // Used within the recursive `adjustBackgroundColor` function that
  // iterates over a color, transforming it until it's accessible

  export interface ColorIteration {
    fgColor: Color;
    bgColor: Color;
    contrast: number;
    iterations: number;
    limitReached: boolean;
  }

  // Final result of the `adjustBackgroundColor` transformation

  export interface ColorWithContrast {
    color: Color;
    contrast: number;
  }

  // Target font sizes for the APCA color contrast algorithm

  interface TargetFontSize {
    weight: number;
    size: number;
  }

  export type TargetFontSizes = TargetFontSize[];
}
