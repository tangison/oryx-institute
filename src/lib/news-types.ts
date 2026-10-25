/** News types shared by the generated meta and the MDX content modules. */

export type NewsCategory = "announcement" | "fieldnote" | "press";

export interface NewsMeta {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  standfirst?: string;
}
