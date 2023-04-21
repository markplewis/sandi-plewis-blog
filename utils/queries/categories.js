import groq from "groq";

export const categoriesQuery = groq`
  *[_type == "category"][] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      title,
      "date": publishedAt,
      "slug": slug.current,
      "image": image{..., ...asset->{
        creditLine,
        description,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
        "aspectRatio": metadata.dimensions.aspectRatio,
        "lqip": metadata.lqip,
        url
      }},
      description
    }
  }
`;
