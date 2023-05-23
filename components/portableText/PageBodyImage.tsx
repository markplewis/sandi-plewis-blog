import Image from "next/image";
import { urlFor } from "~/lib/sanity";
import designTokens from "~/styles/design-tokens";
import { imageBlurDataURL } from "~/utils/images";
import { processCreditLine } from "~/utils/strings";
import type { ImageData } from "~/utils/queries/shared";

import styles from "~/components/portableText/PageBodyImage.module.css";

const PageBodyImage = ({ value }: { value: ImageData }) => {
  const { breakpoints } = designTokens;
  const creditLine = processCreditLine(value?.asset?.creditLine || "");
  // const width = value?.asset?.metadata?.dimensions?.width ?? 0;
  // const height = value?.asset?.metadata?.dimensions?.height ?? 0;
  // const aspectRatio = value?.asset?.metadata?.dimensions?.aspectRatio ?? 1;
  const width = value?.asset?.width ?? 0;
  const height = value?.asset?.height ?? 0;
  const aspectRatio = value?.asset?.aspectRatio ?? 1;
  const alignment = value.alignment;

  let orientation = "square";
  let imageWidth = 400;

  if (width > height) {
    orientation = "landscape";
    imageWidth = 600;
  } else if (height > width) {
    orientation = "portrait";
    imageWidth = 400;
  }
  const imageHeight = Math.round(imageWidth / aspectRatio);

  let sizes: string[] = [];

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

  const classNames = [
    styles.figure,
    alignment ? styles[`align-${alignment}`] : "",
    orientation ? styles[orientation] : ""
  ].join(" ");

  return (
    <figure className={classNames}>
      {value.asset ? (
        <Image
          src={urlFor(value)
            // src={urlFor(value.asset)
            .width(imageWidth * 2)
            .height(imageHeight * 2)
            .quality(90)
            .url()}
          width={imageWidth}
          height={imageHeight}
          quality={90}
          sizes={sizes.join(",")}
          alt={value?.alt || ""}
          placeholder="blur"
          blurDataURL={value?.asset?.lqip || imageBlurDataURL}
        />
      ) : null}

      <figcaption className={styles.caption}>
        {value.caption && <span>{value.caption}</span>}{" "}
        {creditLine && <span dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />}
      </figcaption>
    </figure>
  );
};

export default PageBodyImage;
