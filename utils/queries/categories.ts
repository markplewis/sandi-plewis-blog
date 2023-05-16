import { q, type Selection, type TypeFromSelection } from "groqd";
import { teaserSelection } from "~/utils/queries/shared";

// Selections and types

export const categorySelection = {
  _id: q.string(),
  title: q.string(),
  slug: q.slug("slug")
} satisfies Selection;

export type Category = TypeFromSelection<typeof categorySelection>;

export const categoryWithPostsSelection = {
  ...categorySelection,
  posts: q("*").filter("_type == 'post' && references(^._id)").grab(teaserSelection)
} satisfies Selection;

export type CategoryWithPosts = TypeFromSelection<typeof categoryWithPostsSelection>;

// Queries

export const categoriesQuery = q("*")
  .filter("_type == 'category'")
  .order("title asc")
  .grab(categorySelection);

export const categoryWithPostsQuery = q("*")
  .filter("_type == 'category' && slug.current == $slug")
  .slice(0)
  .grab(categoryWithPostsSelection);

// Old GROQ queries
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
