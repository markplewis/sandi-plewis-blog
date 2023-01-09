import groq from "groq";

export const novelsQuery = groq`
  *[_type == "novel"][] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, "lqip": metadata.lqip, url}},
    description
  }
`;

export const shortStoriesQuery = groq`
  *[_type == "shortStory"][] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, "lqip": metadata.lqip, url}},
    description
  }
`;
