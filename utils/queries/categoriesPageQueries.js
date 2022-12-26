import groq from "groq";

export const categoriesPageQuery = groq`
  *[_type == "category"][] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;
