import groq from "groq";

export const postsQuery = groq`
  *[_type == "post"][] | order(publishedAt desc) {
    _id,
    title,
    "date": publishedAt,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, "palette": metadata.palette, url}},
    description
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "date": publishedAt,
    "slug": slug.current,
    colorPalette,
    primaryColor,
    secondaryColor,
    "image": image{..., ...asset->{
      creditLine,
      description,
      "palette": metadata.palette,
      url
    }},
    "author": author->{name, "slug": slug.current, "picture": image.asset->url},
    "categories": categories[]->{title, "slug": slug.current},
    "body": body[] {
      ...,
      _type == "image" => {
        ...,
        "asset": asset->
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "type": @.reference->_type,
          "slug": @.reference->slug
        }
      }
    },
    description
  }
`;