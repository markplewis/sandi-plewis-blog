import { q, type InferType } from "groqd";
import {
  contentBlockSelections,
  imageSelection,
  imageSampledColorsSelection
} from "~/utils/queries/shared";

export const authorsQuery = q("*")
  .filter("_type == 'author'")
  .order("name asc")
  .grab({
    _id: q.string(),
    name: q.string(),
    slug: q.slug("slug"),
    description: q.string(),
    image: q("image").grab(imageSelection)
  });

export type Authors = InferType<typeof authorsQuery>;

export const authorQuery = q("*")
  .filter("_type == 'author' && slug.current == $slug")
  .slice(0)
  .grab({
    _id: q.string(),
    name: q.string(),
    slug: q.slug("slug"),
    description: q.string(),
    image: q("image").grab(imageSelection),
    biography: q("biography").filter().select(contentBlockSelections),
    pageColors: q.object(imageSampledColorsSelection).nullable()
  });

export type Author = InferType<typeof authorQuery>;

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
