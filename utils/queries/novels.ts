import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  pageColorsAndStylesSelection,
  teaserSelection
} from "~/utils/queries/shared";

// Selections and types

export const novelFeaturedSelection = {
  ...teaserSelection,
  overview: q("overview").filter().select(contentBlockSelections).nullable()
} satisfies Selection;

export type NovelFeatured = TypeFromSelection<typeof novelFeaturedSelection>;

export const novelSelection = {
  ...novelFeaturedSelection,
  body: q("body").filter().select(contentBlockSelections).nullable(),
  reviews: q("*")
    .filter("_type == 'review' && references(^._id)")
    .order("_createdAt desc")
    .grab({
      _id: q.string(),
      title: q.string(),
      text: q.string(),
      author: q.string()
    })
    .nullable(),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type Novel = TypeFromSelection<typeof novelSelection>;

// Queries

export const novelsQuery = q("*")
  .filter("_type == 'novel'")
  .order("publishedAt desc")
  .grab(teaserSelection);

export const novelQuery = q("*")
  .filter("_type == 'novel' && slug.current == $slug")
  .slice(0)
  .grab(novelSelection);

// Old GROQ queries
// The above GROQD schemas replace the following GROQ queries:

// export const novelsQuery = groq`
//   *[_type == "novel"][] | order(publishedAt desc) {
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

// export const novelQuery = groq`
//   *[_type == "novel" && slug.current == $slug][0] {
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
//     description,
//     "reviews": *[_type=="review" && references(^._id)] | order(_createdAt desc) {
//       _id, title, review, author
//     }
//   }
// `;
