import groq from "groq";

export const novelQuery = groq`
  *[_type == "novel" && slug.current == $slug][0] {
    _id,
    title,
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
    description,
    "reviews": *[_type=='review' && references(^._id)]{ _id, title, review, author }
  }
`;
