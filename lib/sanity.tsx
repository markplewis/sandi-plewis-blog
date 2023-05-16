import {
  PortableText as PortableTextComponent,
  type PortableTextComponents,
  type PortableTextProps
} from "@portabletext/react";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "~/lib/sanity.client";

import InternalLink from "~/components/portableText/InternalLink";
import LineBreak from "~/components/portableText/LineBreak";
import PageBodyImage from "~/components/portableText/PageBodyImage";

// See: https://www.sanity.io/docs/image-url

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

// See: https://github.com/portabletext/react-portabletext

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => <PageBodyImage value={value} />,
    break: ({ value }) => <LineBreak value={value} />
  },
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export const PortableText = (props: PortableTextProps) => (
  <PortableTextComponent components={portableTextComponents} {...props} />
);
