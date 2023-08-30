import { q, type Selection, type TypeFromSelection } from "groqd";
import {
  contentBlockSelections,
  pageColorsAndStylesSelection,
  teaserSelection
} from "~/utils/queries/shared";

// Selections and types

export const newsItemFeaturedSelection = {
  ...teaserSelection,
  overview: q("overview").filter().select(contentBlockSelections).nullable()
} satisfies Selection;

export type NewsItemFeatured = TypeFromSelection<typeof newsItemFeaturedSelection>;

export const newsItemSelection = {
  ...newsItemFeaturedSelection,
  body: q("body").filter().select(contentBlockSelections).nullable(),
  pageColorsAndStyles: q.object(pageColorsAndStylesSelection).nullable() // Appended post-query
} satisfies Selection;

export type NewsItem = TypeFromSelection<typeof newsItemSelection>;

// Queries

export const newsItemsQuery = q("*")
  .filter("_type == 'newsItem'")
  .order("publishedAt desc")
  .grab(teaserSelection);

export const newsItemQuery = q("*")
  .filter("_type == 'newsItem' && slug.current == $slug")
  .slice(0)
  .grab(newsItemSelection);
