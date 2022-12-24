import groq from "groq";

export const postsPageQuery = groq`
  *[_type == "post"][] | order(publishedAt desc) {
    _id,
    title,
    "date": publishedAt,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, "palette": metadata.palette, url}},
    description
  }
`;
