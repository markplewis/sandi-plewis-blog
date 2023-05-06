import { SanityDocument } from "@sanity/client";
import { SPColors } from "~/typings/color.d";

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
