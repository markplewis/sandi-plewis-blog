import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  imageSelection,
  pageColorsAndStylesSelection
} from "~/utils/queries/shared";

// Selections and types

export const authorFeaturedSelection = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  image: q("image").grab(imageSelection),
  shortBiography: q("shortBiography").filter().select(contentBlockSelections)
} satisfies Selection;

export type AuthorFeatured = TypeFromSelection<typeof authorFeaturedSelection>;

export const authorTeaserSelection = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  image: q("image").grab(imageSelection),
  description: q.string()
} satisfies Selection;

export type AuthorTeaser = TypeFromSelection<typeof authorTeaserSelection>;

export const authorSelection = {
  ...authorTeaserSelection,
  biography: q("biography").filter().select(contentBlockSelections),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type Author = TypeFromSelection<typeof authorSelection>;

// Queries

export const authorsQuery = q("*")
  .filter("_type == 'author'")
  .order("name asc")
  .grab(authorTeaserSelection);

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
