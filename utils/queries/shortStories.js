import groq from "groq";

export const shortStoryQuery = groq`
  *[_type == "shortStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "image": image{..., ...asset->{
      creditLine,
      description,
      "lqip": metadata.lqip,
      url
    }},
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
