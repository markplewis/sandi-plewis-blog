import { q, type InferType } from "groqd";
import { imageSelection } from "~/utils/queries/shared";

export const categoriesQuery = q("*")
  .filter("_type == 'category'")
  .order("title asc")
  .grab({
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug")
  });

export type Categories = InferType<typeof categoriesQuery>;

export const categoryQuery = q("*")
  .filter("_type == 'category' && slug.current == $slug")
  .slice(0)
  .grab({
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    posts: q("*")
      .filter("_type == 'post' && references(^._id)")
      .grab({
        _id: q.string(),
        title: q.string(),
        date: ["publishedAt", q.string()],
        slug: q.slug("slug"),
        description: q.string(),
        image: q("image").grab(imageSelection)
      })
  });

export type Category = InferType<typeof categoryQuery>;

// The above GROQD schemas replace the following GROQ queries:

// export const categoriesQuery = groq`
//   *[_type == "category"][] | order(title asc) {
//     _id,
//     title,
//     "slug": slug.current
//   }
// `;

// export const categoryQuery = groq`
//   *[_type == "category" && slug.current == $slug][0] {
//     _id,
//     title,
//     "slug": slug.current,
//     "posts": *[_type == "post" && references(^._id)]{
//       _id,
//       title,
//       "date": publishedAt,
//       "slug": slug.current,
//       "image": image{..., ...asset->{
//         creditLine,
//         description,
//         "width": metadata.dimensions.width,
//         "height": metadata.dimensions.height,
//         "aspectRatio": metadata.dimensions.aspectRatio,
//         "lqip": metadata.lqip,
//         url
//       }},
//       description
//     }
//   }
// `;
