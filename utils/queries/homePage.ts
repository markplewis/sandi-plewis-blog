import groq from "groq";

export const featuredNovelAndHomePageQuery = groq`
  *[_type == "homePage"][0] {
    "novel": novel->{
      _id,
      title,
      "slug": slug.current,
      "overview": overview[] {
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "type": @.reference->_type,
            "slug": @.reference->slug
          }
        }
      },
      "image": image{..., ...asset->{
        creditLine,
        description,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        "aspectRatio": metadata.dimensions.aspectRatio,
        "lqip": metadata.lqip,
        url
      }}
    },
    description
  }
`;

export const featuredReviewsQuery = groq`
  *[_type == "homePage"][0].reviews[]->{review, author, title, _id}
`;

function getRecentPostsQuery(limit: number) {
  return groq`
    *[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      image,
      description,
      _id,
      "date": publishedAt
    } [0..${limit - 1}]
  `;
}
export const recentPostsQuery = getRecentPostsQuery(3);

export const authorBioQuery = groq`
  *[_type == "homePage"][0].author->{
    name,
    image,
    "slug": slug.current, _id,
    shortBiography[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "type": @.reference->_type,
          "slug": @.reference->slug
        }
      }
    }
  }
`;
