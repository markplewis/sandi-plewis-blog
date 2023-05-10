import { q, type Selection, type TypeFromSelection } from "groqd";

// Initial colors returned from Sanity

const imageSampledColorSelection = {
  r: q.number(),
  g: q.number(),
  b: q.number(),
  h: q.number(),
  s: q.number(),
  l: q.number()
} satisfies Selection;

export type ImageSampledColor = TypeFromSelection<typeof imageSampledColorSelection>;

// ------------------ //

export const imageSampledColorsSelection = {
  primary: q.object(imageSampledColorSelection),
  secondary: q.object(imageSampledColorSelection)
} satisfies Selection;

export type ImageSampledColors = TypeFromSelection<typeof imageSampledColorsSelection>;

// ------------------ //

export const imageSelection = {
  crop: q
    .object({
      top: q.number(),
      right: q.number(),
      bottom: q.number(),
      left: q.number()
    })
    .nullable(),
  hotspot: q
    .object({
      x: q.number(),
      y: q.number(),
      width: q.number(),
      height: q.number()
    })
    .nullable(),
  asset: q("asset")
    .deref()
    .grab({
      width: ["metadata.dimensions.width", q.number()],
      height: ["metadata.dimensions.height", q.number()],
      aspectRatio: ["metadata.dimensions.aspectRatio", q.number()],
      lqip: ["metadata.lqip", q.string()],
      url: q.string().nullable(),
      creditLine: q.string().nullable(),
      description: q.string().nullable() // TODO: is this used?
    }),
  alt: q.string().nullable(),
  caption: q.string().nullable(),
  alignment: q.string().nullable(),
  // TODO: rename this field to `sampledColors` within the Sanity schema
  pageColors: q.object(imageSampledColorsSelection).nullable()
} satisfies Selection;

export type Image = TypeFromSelection<typeof imageSelection>;

// ------------------ //

const contentBlockSelection = {
  _type: q.literal("block"),
  _key: q.string(),
  children: q.array(
    q.object({
      _key: q.string(),
      _type: q.string(),
      text: q.string(),
      marks: q.array(q.string())
    })
  ),
  markDefs: q("markDefs")
    .filter()
    .select({
      '_type == "internalLink"': {
        _key: q.string(),
        _type: q.literal("internalLink"),
        type: ["@.reference->_type", q.string()],
        slug: ["@.reference->slug.current", q.string()]
      },
      '_type == "link"': {
        _key: q.string(),
        _type: q.literal("link"),
        href: q.string()
      }
    })
    .nullable(),
  style: q.string().nullish(),
  listItem: q.string().nullish(),
  level: q.number().nullish()
} satisfies Selection;

export type ContentBlock = TypeFromSelection<typeof contentBlockSelection>;

// ------------------ //

export const contentBlockSelections = {
  "_type == 'block'": contentBlockSelection,
  "_type == 'image'": {
    _type: q.literal("image"),
    _key: q.string(),
    ...imageSelection
  },
  // Below is a model for if your portable text field includes other types other than blocks
  // you could separate these out into "Selections" to provide to your components for types
  // "_typeassetblockImageRow'": {
  //   _type: q.literal("blockImageRow"),
  //   images: q("images")
  //     .filter()
  //     .grab({
  //       image: q.sanityImage("image", {
  //         withAsset: ["base", "dimensions", "hasAlpha", "lqip"],
  //         withHotspot: true,
  //         withCrop: true,
  //         additionalFields: {
  //           alt: q.string().nullish()
  //         }
  //       }),
  //       caption: q.string().nullish()
  //     })
  // },
  default: contentBlockSelection
};

// ------------------ //

// Final, transformed page colors and CSS styles

const pageColorSelection = {
  r: q.number(),
  g: q.number(),
  b: q.number(),
  h: q.number(),
  s: q.number(),
  l: q.number(),
  contrast: q.number()
} satisfies Selection;

export type PageColor = TypeFromSelection<typeof pageColorSelection>;

// ------------------ //

const pageColorsSelection = {
  primary: q.object(pageColorSelection),
  secondary: q.object(pageColorSelection),
  primaryOriginal: q.object(pageColorSelection),
  secondaryAdjusted: q.object(pageColorSelection)
} satisfies Selection;

export type PageColors = TypeFromSelection<typeof pageColorsSelection>;

// ------------------ //

const pageColorsAndStylesSelection = {
  colors: q.object(pageColorsSelection),
  styles: q.string()
} satisfies Selection;

export type PageColorsAndStyles = TypeFromSelection<typeof pageColorsAndStylesSelection>;
