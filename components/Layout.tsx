import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useMemo } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Main from "~/components/Main";
import PreviewMessage from "~/components/PreviewMessage";
import SkipLink from "~/components/SkipLink";
import { BASE_URL, DEFAULT_META_DESCRIPTION, env, envProd, SITE_TITLE } from "~/env/constants";
import { urlFor } from "~/lib/sanity";
import type { ImageData, PageColors } from "~/utils/queries/shared";

import useDebug from "~/utils/useDebug";

// See: https://nextjs.org/docs/basic-features/layouts

// Allow bracket notation object property access
// https://stackoverflow.com/questions/34727936/typescript-bracket-notation-property-access
interface IndexableSizes {
  [key: string]: {
    [key: string]: {
      width: number;
      height: number;
    };
  };
}

const sizes: IndexableSizes = {
  twitter: {
    // "Summary Card with Large Image": aspect ratio of 2:1 with minimum dimensions of 300 x 157
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
    landscape: {
      width: 1200,
      height: 628
    },
    // "Summary Card": apspect ratio of 1:1 with minimum dimensions of 144 x 144
    // https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
    portrait: {
      width: 600,
      height: 600
    }
  },
  // 1.91:1 aspect ratio (equivalent to 40:21) with minimum dimensions of 1200 x 630
  // https://developers.facebook.com/docs/sharing/webmasters/images/
  facebook: {
    landscape: {
      width: 1200,
      height: 630
    },
    // Roughly 9:14 (becuase 1:1.91 is too narrow for headshots and book covers)
    portrait: {
      width: 770,
      height: 1200
    }
  }
};

const LayoutPropTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  description: PropTypes.string,
  imageProps: PropTypes.object
};

function Layout({
  title = "",
  description = DEFAULT_META_DESCRIPTION,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageColors,
  imageProps,
  children
}: {
  title: string;
  description: string;
  pageColors?: PageColors;
  imageProps?: {
    image: ImageData;
    portrait: boolean;
    cropped: boolean;
  };
  children?: JSX.Element | JSX.Element[];
}) {
  const debug = useDebug();
  const router = useRouter();
  const asPath = router.asPath;
  // There's a bug where the home page's `asPath` doesn't seem to change from
  // `/index` to `/` quickly enough, so Facebook scrapes the wrong value.
  // See: https://github.com/vercel/next.js/issues/35345
  const url = `${BASE_URL}${asPath === "/index" ? "/" : asPath}`;
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const noIndex = !envProd || router.pathname === "/login";

  const image = imageProps?.image;
  const imagePortrait = imageProps?.portrait;
  const imageCropped = imageProps?.cropped;

  let imageAlt;
  let imageOrientation;
  let twitterImageURL;
  let facebookImageURL;

  if (image) {
    imageAlt = image?.alt;
    imageOrientation =
      image && imagePortrait ? "portrait" : image && !imagePortrait ? "landscape" : null;

    // Twitter
    if (imageOrientation === "portrait") {
      if (imageCropped) {
        // Crop portrait images into a square shape
        twitterImageURL = urlFor(image)
          .width(sizes.twitter.portrait.width)
          .height(sizes.twitter.portrait.height)
          .quality(90)
          // .fit("crop") // This is the default?
          .url();
      } else {
        // Fit portrait images into a square shape by filling in the background with a solid color
        twitterImageURL = urlFor(image)
          .ignoreImageParams() // Workaround for https://github.com/sanity-io/sanity/issues/524
          .width(sizes.twitter.portrait.width)
          .height(sizes.twitter.portrait.height)
          .quality(90)
          .fit("fill")
          // TODO: add a `hex` property to `pageColors` (I guess?)
          .bg("666")
          // .bg(image.pageColors?.primary.hex.replace("#", "") ?? "666"))
          .url();
      }
    } else if (imageOrientation === "landscape") {
      twitterImageURL = urlFor(image)
        .width(sizes.twitter.landscape.width)
        .height(sizes.twitter.landscape.height)
        .quality(90)
        .url();
    }
    // Facebook
    if (imageOrientation === "portrait") {
      facebookImageURL = urlFor(image)
        .width(sizes.facebook.portrait.width)
        .height(sizes.facebook.portrait.height)
        .quality(90)
        .url();
    } else if (imageOrientation === "landscape") {
      facebookImageURL = urlFor(image)
        .width(sizes.facebook.landscape.width)
        .height(sizes.facebook.landscape.height)
        .quality(90)
        .url();
    }
  }

  useMemo(() => debug && console.log(`env: ${env}`), [debug]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        {noIndex ? <meta name="robots" content="noindex" /> : null}
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}

        {/* Icons */}
        {/* `favicon.svg` supports dark mode: https://css-tricks.com/dark-mode-favicons/ */}
        {/* `favicon.ico` and other files were generated from SVG via: https://realfavicongenerator.net/ */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#305975" />
        <meta name="msapplication-TileColor" content="#305975" />
        <meta name="theme-color" content="#305975" />

        {/* Twitter */}
        {/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary */}
        <meta
          name="twitter:card"
          content={
            twitterImageURL && imageOrientation === "landscape" ? "summary_large_image" : "summary"
          }
        />
        <meta name="twitter:site" content="@SandiPlewis" />
        <meta name="twitter:title" content={title || SITE_TITLE} />
        <meta name="twitter:description" content={description} />
        {twitterImageURL && <meta name="twitter:image" content={twitterImageURL} />}
        {twitterImageURL && imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

        {/* Facebook */}
        {/* https://developers.facebook.com/docs/sharing/webmasters/ */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title || SITE_TITLE} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        {facebookImageURL && imageOrientation && (
          <>
            <meta property="og:image" content={facebookImageURL} />
            <meta property="og:image:width" content={`${sizes.facebook[imageOrientation].width}`} />
            <meta
              property="og:image:height"
              content={`${sizes.facebook[imageOrientation].height}`}
            />
          </>
        )}
        {facebookImageURL && imageAlt && <meta name="og:image:alt" content={imageAlt} />}
      </Head>
      <SkipLink />
      <PreviewMessage />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
Layout.displayName = "Layout";
Layout.propTypes = LayoutPropTypes;
export default Layout;
