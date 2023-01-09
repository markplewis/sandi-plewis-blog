import groq from "groq";

export const authorsQuery = groq`
  *[_type == "author"][] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, "lqip": metadata.lqip, url}},
    description
  }
`;

export const authorQuery = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    colorPalette,
    primaryColor,
    secondaryColor,
    "image": image{..., ...asset->{
      creditLine,
      description,
      "palette": metadata.palette,
      "lqip": metadata.lqip,
      url
    }},
    "biography": biography[] {
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
