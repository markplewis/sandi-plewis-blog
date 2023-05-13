import { q, type Selection, type TypeFromSelection } from "groqd";

// Selections and types

export const reviewSelection = {
  _id: q.string(),
  title: q.string(),
  text: q.string(),
  author: q.string()
} satisfies Selection;

export type Review = TypeFromSelection<typeof reviewSelection>;
