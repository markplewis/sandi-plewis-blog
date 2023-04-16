import Image from "next/image";
import { urlFor } from "lib/sanity";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";
import { processCreditLine } from "utils/strings";

import styles from "components/portableText/PostBodyImage.module.css";

const PostBodyImage = ({ value }) => {
  const { breakpoints } = designTokens;
  const creditLine = processCreditLine(value?.asset?.creditLine);
  const width = value?.asset?.metadata?.dimensions?.width ?? 0;
  const height = value?.asset?.metadata?.dimensions?.height ?? 0;

  let orientation = "square";
  if (width > height) {
    orientation = "landscape";
  } else if (height > width) {
    orientation = "portrait";
  }
  const alignment = value.alignment;
  let imageWidth;
  let imageHeight;

  switch (orientation) {
    case "square":
      // 1:1 aspect ratio
      imageWidth = 400;
      imageHeight = 400;
      break;
    case "portrait":
      // 3:4 aspect ratio
      imageWidth = 400;
      imageHeight = 533;
      break;
    case "landscape":
    default:
      // 3:2 aspect ratio
      imageWidth = 600;
      imageHeight = 400;
      break;
  }

  const classNames = [
    styles.figure,
    alignment ? styles[`align-${alignment}`] : "",
    orientation ? styles[orientation] : ""
  ].join(" ");

  let sizes = [];

  if (orientation === "square" || orientation === "portrait") {
    if (alignment === "left" || alignment === "right") {
      sizes = [`(min-width: ${breakpoints.w800.value}rem) 200px`, "300px"];
    } else if (alignment === "center") {
      sizes = [`(min-width: ${breakpoints.w800.value}rem) 400px`, "300px"];
    }
  } else if (orientation === "landscape") {
    if (alignment === "left" || alignment === "right") {
      sizes = [`(min-width: ${breakpoints.w800.value}rem) 300px`, "450px"];
    } else if (alignment === "center") {
      sizes = [`(min-width: ${breakpoints.w800.value}rem) 600px`, "450px"];
    }
  }

  return (
    <figure className={classNames}>
      {value.asset ? (
        <Image
          src={urlFor(value.asset)
            .width(imageWidth * 2)
            .height(imageHeight * 2)
            .url()}
          width={imageWidth}
          height={imageHeight}
          sizes={sizes.join(",")}
          alt={value?.alt}
          placeholder="blur"
          blurDataURL={value?.asset?.metadata?.lqip || imageBlurDataURL}
        />
      ) : null}

      <figcaption className={styles.caption}>
        {value.caption && <span>{value.caption}</span>}{" "}
        {creditLine && <span dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />}
      </figcaption>
    </figure>
  );
};

export default PostBodyImage;
