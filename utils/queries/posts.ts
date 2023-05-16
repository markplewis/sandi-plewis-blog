import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  pageColorsAndStylesSelection,
  teaserSelection
} from "~/utils/queries/shared";

// Selections and types

export const postSelection = {
  ...teaserSelection,
  author: q("author")
    .deref()
    .grab({
      _id: q.string(),
      title: q.string(),
      slug: q.slug("slug")
    }),
  categories: q("categories")
    .filter()
    .deref()
    .grab({
      _id: q.string(),
      title: q.string(),
      slug: q.slug("slug")
    })
    .nullable(),
  body: q("body").filter().select(contentBlockSelections).nullable(),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type Post = TypeFromSelection<typeof postSelection>;

// Queries

export const postsQuery = q("*")
  .filter("_type == 'post'")
  .order("publishedAt desc")
  .grab(teaserSelection);

export const postQuery = q("*")
  .filter("_type == 'post' && slug.current == $slug")
  .slice(0)
  .grab(postSelection);

// Old GROQ queries
// The above GROQD schemas replace the following GROQ queries:

// export const postsQuery = groq`
//   *[_type == "post"][] | order(publishedAt desc) {
//     _id,
//     title,
//     "date": publishedAt,
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
//     description
//   }
// `;

// export const postQuery = groq`
//   *[_type == "post" && slug.current == $slug][0] {
//     _id,
//     title,
//     "date": publishedAt,
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
//     "author": author->{name, "slug": slug.current, "picture": image.asset->url},
//     "categories": categories[]->{title, "slug": slug.current},
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
