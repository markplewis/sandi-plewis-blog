import { PortableText as PortableTextComponent } from "@portabletext/react";
import type { PortableTextProps } from "@portabletext/react/src/types";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "~/lib/sanity.client";

// See: https://www.sanity.io/docs/image-url

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

// See: https://github.com/portabletext/react-portabletext

export const PortableText = (props: PortableTextProps) => (
  <PortableTextComponent components={{}} {...props} />
);
