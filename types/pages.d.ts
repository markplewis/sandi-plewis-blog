import type { SanityDocument } from "@sanity/client";
import type { SPColors } from "~/types/color.d";

declare namespace SPPages {
  export interface DirectoryPage {
    preview: boolean;
    previewData: string;
    data: SanityDocument;
  }

  export interface LeafPage extends DirectoryPage {
    slug: string;
  }

  export interface HomePage {
    novelAndHomePage: SanityDocument;
    reviews: SanityDocument;
    posts: SanityDocument;
    author: SanityDocument;
    pageColors: SPColors.PageColorsAndStyles | null;
  }
}
