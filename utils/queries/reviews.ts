import { q, type Selection, type TypeFromSelection } from "groqd";

// Selections and types

export const reviewSelection = {
  _id: q.string(),
  title: q.string().optional().default(""),
  text: q.string(),
  author: q.string().optional().default(""),
  novel: q("novel").deref().grab({ title: q.string() })
} satisfies Selection;

export type Review = TypeFromSelection<typeof reviewSelection>;
