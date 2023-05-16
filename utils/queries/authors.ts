import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  pageColorsAndStylesSelection,
  teaserSelection
} from "~/utils/queries/shared";

// Selections and types

export const authorFeaturedSelection = {
  ...teaserSelection,
  shortBiography: q("shortBiography").filter().select(contentBlockSelections).nullable()
} satisfies Selection;

export type AuthorFeatured = TypeFromSelection<typeof authorFeaturedSelection>;

export const authorSelection = {
  ...teaserSelection,
  biography: q("biography").filter().select(contentBlockSelections).nullable(),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type Author = TypeFromSelection<typeof authorSelection>;

// Queries

export const authorsQuery = q("*")
  .filter("_type == 'author'")
  .order("name asc")
  .grab(teaserSelection);

export const authorQuery = q("*")
  .filter("_type == 'author' && slug.current == $slug")
  .slice(0)
  .grab(authorSelection);

// Old GROQ queries
// The above GROQD schemas replace the following GROQ queries:

// export const authorsQuery = groq`
//   *[_type == "author"][] | order(name asc) {
//     _id,
//     name,
//     "slug": slug.current,
//     "image": image{..., ...asset->{creditLine, description, "lqip": metadata.lqip, url}},
//     description
//   }
// `;

// export const authorQuery = groq`
//   *[_type == "author" && slug.current == $slug][0] {
//     _id,
//     name,
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
//     }},
//     "biography": biography[] {
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
//     }
//   }
// `;
