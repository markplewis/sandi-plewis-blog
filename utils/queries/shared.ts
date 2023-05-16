import { q, type Selection, type TypeFromSelection } from "groqd";
import type { Novel } from "~/utils/queries/novels";
import type { ShortStory } from "~/utils/queries/shortStories";

// Initial colors returned from Sanity

const sampledColorSelection = {
  r: q.number(),
  g: q.number(),
  b: q.number(),
  h: q.number(),
  s: q.number(),
  l: q.number()
} satisfies Selection;

export type SampledColor = TypeFromSelection<typeof sampledColorSelection>;

// ------------------ //

const sampledColorsSelection = {
  primary: q.object(sampledColorSelection),
  secondary: q.object(sampledColorSelection)
} satisfies Selection;

export type SampledColors = TypeFromSelection<typeof sampledColorsSelection>;

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
      url: q.string().optional().default(""),
      creditLine: q.string().optional().default(""),
      description: q.string().optional().default("")
    }),
  alt: q.string().optional().default(""),
  caption: q.string().optional().default(""),
  alignment: q.string().optional().default(""),
  sampledColors: q.object(sampledColorsSelection).nullable() // Appended post-query
} satisfies Selection;

export type ImageData = TypeFromSelection<typeof imageSelection>;

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
  "_type == 'break'": {
    _type: q.literal("break"),
    _key: q.string(),
    style: q.string()
  },
  default: contentBlockSelection
};

// const contentBlockSelectionsQuery = q("*").filter().select(contentBlockSelections).nullable();
// export type ContentBlocks = InferType<typeof contentBlockSelectionsQuery>;

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

export const pageColorsAndStylesSelection = {
  colors: q.object(pageColorsSelection),
  styles: q.string()
} satisfies Selection;

export type PageColorsAndStyles = TypeFromSelection<typeof pageColorsAndStylesSelection>;

// ------------------ //

export type NovelsAndShortStories = {
  novels: Novel[];
  shortStories: ShortStory[];
};

// ------------------ //

export const teaserSelection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug("slug"),
  date: ["publishedAt", q.string().optional()],
  image: q("image").grab(imageSelection).nullable(),
  description: q.string().optional().default("")
} satisfies Selection;

export type Teaser = TypeFromSelection<typeof teaserSelection>;
