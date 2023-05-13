import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  imageSelection,
  pageColorsAndStylesSelection
} from "~/utils/queries/shared";

// Selections and types

export const shortStoryTeaserSelection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug("slug"),
  image: q("image").grab(imageSelection),
  description: q.string()
} satisfies Selection;

export type ShortStoryTeaser = TypeFromSelection<typeof shortStoryTeaserSelection>;

export const shortStorySelection = {
  ...shortStoryTeaserSelection,
  overview: q("overview").filter().select(contentBlockSelections),
  body: q("body").filter().select(contentBlockSelections),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type ShortStory = TypeFromSelection<typeof shortStorySelection>;

// Queries

export const shortStoriesQuery = q("*")
  .filter("_type == 'shortStory'")
  .order("publishedAt desc")
  .grab(shortStoryTeaserSelection);

export const shortStoryQuery = q("*")
  .filter("_type == 'shortStory' && slug.current == $slug")
  .slice(0)
  .grab(shortStorySelection);

// Old GROQ queries
// The above GROQD schemas replace the following GROQ queries:

// export const shortStoriesQuery = groq`
//   *[_type == "shortStory"][] | order(publishedAt desc) {
//     _id,
//     title,
//     "slug": slug.current,
//     description,
//     "image": image{..., ...asset->{
//       creditLine,
//       description,
//       "width": metadata.dimensions.width,
//       "height": metadata.dimensions.height,
//       "aspectRatio": metadata.dimensions.aspectRatio,
//       "lqip": metadata.lqip,
//       url
//     }}
//   }
// `;

// export const shortStoryQuery = groq`
//   *[_type == "shortStory" && slug.current == $slug][0] {
//     _id,
//     title,
//     "slug": slug.current,
//     "image": image{..., ...asset->{
//       creditLine,
//       description,
//       "width": metadata.dimensions.width,
//       "height": metadata.dimensions.height,
//       "aspectRatio": metadata.dimensions.aspectRatio,
//       "lqip": metadata.lqip,
//       url
//     }},
//     "overview": overview[] {
//       ...,
//       markDefs[]{
//         ...,
//         _type == "internalLink" => {
//           "type": @.reference->_type,
//           "slug": @.reference->slug
//         }
//       }
//     },
//     "body": body[] {
//       ...,
//       _type == "image" => {
//         ...,
//         "asset": asset->
//       },
//       markDefs[]{
//         ...,
//         _type == "internalLink" => {
//           "type": @.reference->_type,
//           "slug": @.reference->slug
//         }
//       }
//     },
//     description
//   }
// `;
