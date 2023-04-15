import Image from "next/image";
import { urlFor } from "lib/sanity";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";
import { processCreditLine } from "utils/strings";
import useMediaQuery from "utils/useMediaQuery";

import styles from "components/portableText/PostBodyImage.module.css";

const PostBodyImage = ({ value }) => {
  // TODO: replace these matchMedia queries with CSS media queries
  const { breakpoints } = designTokens;
  const isMedium = useMediaQuery(`(min-width: ${breakpoints.w800.value}rem)`);
  const alignment = isMedium ? value.alignment : "center";
  const alignmentClass = alignment ? `align-${alignment}` : "";
  const width = value?.asset?.metadata?.dimensions?.width ?? 0;
  const height = value?.asset?.metadata?.dimensions?.height ?? 0;
  const creditLine = processCreditLine(value?.asset?.creditLine);

  let orientation = "square";
  if (width > height) {
    orientation = "landscape";
  } else if (height > width) {
    orientation = "portrait";
  }
  // 9:14 aspect ratio for portrait, 3:2 for landscape
  let imageWidth;
  let imageHeight;
  switch (orientation) {
    case "square":
      imageWidth = alignment === "center" ? 600 : 200;
      imageHeight = alignment === "center" ? 600 : 200;
      break;
    case "portrait":
      imageWidth = alignment === "center" ? 400 : 200;
      imageHeight = alignment === "center" ? 600 : 300;
      break;
    case "landscape":
    default:
      imageWidth = alignment === "center" ? 600 : 300;
      imageHeight = alignment === "center" ? 400 : 200;
      break;
  }
  const image = value.asset ? (
    <Image
      src={urlFor(value.asset)
        .width(imageWidth * 2)
        .height(imageHeight * 2)
        .url()}
      width={imageWidth}
      height={imageHeight}
      // Media query `max-width` must match the one in `PostBodyImage.module.css`
      sizes={`(max-width: ${breakpoints.w800.value}rem) 100vw, ${imageWidth * 2}px`}
      alt={value?.alt}
      placeholder="blur"
      blurDataURL={value?.asset?.metadata?.lqip || imageBlurDataURL}
    />
  ) : null;

  return (
    <figure
      className={`${styles.figure} ${styles[alignmentClass]}`}
      style={{ maxWidth: `${imageWidth}px` }}>
      {image}
      <figcaption className={styles.caption}>
        {value.caption && <span>{value.caption}</span>}{" "}
        {creditLine && <span dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />}
      </figcaption>
    </figure>
  );
};

export default PostBodyImage;
