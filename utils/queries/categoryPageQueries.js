import groq from "groq";

export const categoryPageQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      title,
      "date": publishedAt,
      "slug": slug.current,
      "image": image{..., ...asset->{creditLine, description, "palette": metadata.palette, url}},
      description
    }
  }
`;
