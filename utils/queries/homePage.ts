import { q, type InferType } from "groqd";
import { authorFeaturedSelection } from "~/utils/queries/authors";
import { novelFeaturedSelection } from "~/utils/queries/novels";
import { postTeaserSelection } from "~/utils/queries/posts";
import { reviewSelection } from "~/utils/queries/reviews";
import { pageColorsAndStylesSelection } from "~/utils/queries/shared";

export const homePageItemsQuery = q("*")
  .filter("_type == 'homePage'")
  .slice(0)
  .grab({
    description: q.string(),
    author: q("author").deref().grab(authorFeaturedSelection),
    novel: q("novel").deref().grab(novelFeaturedSelection),
    reviews: q("reviews").filter().deref().grab(reviewSelection), // TODO: array?
    pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable()
  });

export type HomePageItems = InferType<typeof homePageItemsQuery>;

export const recentPostsQuery = q("*")
  .filter("_type == 'post'")
  .order("publishedAt desc")
  .slice(0, 3)
  .grab(postTeaserSelection);

export type RecentPosts = InferType<typeof recentPostsQuery>;

export type HomePageData = {
  homePage: HomePageItems;
  posts: RecentPosts;
};

// Old GROQ queries
// The above GROQD schemas replace the following GROQ queries:

// export const featuredNovelAndHomePageQuery = groq`
//   *[_type == "homePage"][0] {
//     "novel": novel->{
//       _id,
//       title,
//       "slug": slug.current,
//       "overview": overview[] {
//         ...,
//         markDefs[]{
//           ...,
//           _type == "internalLink" => {
//             "type": @.reference->_type,
//             "slug": @.reference->slug
//           }
//         }
//       },
//       "image": image{..., ...asset->{
//         creditLine,
//         description,
//         "width": metadata.dimensions.width,
//         "height": metadata.dimensions.height,
//         "aspectRatio": metadata.dimensions.aspectRatio,
//         "lqip": metadata.lqip,
//         url
//       }}
//     },
//     description
//   }
// `;

// export const featuredReviewsQuery = groq`
//   *[_type == "homePage"][0].reviews[]->{review, author, title, _id}
// `;

// function getRecentPostsQuery(limit: number) {
//   return groq`
//     *[_type == "post"] | order(publishedAt desc) {
//       title,
//       "slug": slug.current,
//       image,
//       description,
//       _id,
//       "date": publishedAt
//     } [0..${limit - 1}]
//   `;
// }
// export const recentPostsQuery = getRecentPostsQuery(3);

// export const authorBioQuery = groq`
//   *[_type == "homePage"][0].author->{
//     name,
//     image,
//     "slug": slug.current, _id,
//     shortBiography[]{
//       ...,
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
