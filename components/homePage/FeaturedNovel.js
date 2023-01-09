import Image from "next/image";
import Link from "next/link";
import PageTitle from "components/global/PageTitle";
import InternalLink from "components/portableText/InternalLink";
import { PortableText, urlFor } from "lib/sanity";
import { breakpoints } from "styles/js-env-variables";
import { imageBlurDataURL } from "utils/images";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function FeaturedNovel({ novel }) {
  return (
    <>
      <PageTitle>{novel?.title}</PageTitle>

      {novel?.image ? (
        // Temporary inline style until layout and/or container queries are ready
        <div style={{ maxWidth: "188px" }}>
          <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
            {/* See: https://nextjs.org/docs/advanced-features/codemods#before-responsive */}
            <Image
              src={urlFor(novel?.image).width(376).height(581).url()}
              width={188}
              height={290}
              sizes={`(max-width: ${breakpoints.w800}rem) 100vw, 188px`}
              alt={novel?.image?.alt || novel?.title}
              placeholder="blur"
              blurDataURL={novel?.image?.lqip || imageBlurDataURL}
              className="responsive-image"
            />
          </Link>
        </div>
      ) : null}

      {novel?.overview ? (
        <PortableText value={novel?.overview} components={portableTextComponents} />
      ) : null}

      <p>
        <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
          More information
        </Link>
      </p>
    </>
  );
}
