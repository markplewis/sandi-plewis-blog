import Image from "next/legacy/image";
import { urlFor } from "lib/sanity";
import { processCreditLine } from "utils/strings";
import { rem } from "utils/units";
import useMediaQuery from "utils/useMediaQuery";

import styles from "components/portableText/PostBodyImage.module.css";

const PostBodyImage = ({ value }) => {
  const isMedium = useMediaQuery(`(min-width: ${rem(800)})`);
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
      imageWidth = alignment === "center" ? 400 : 188;
      imageHeight = alignment === "center" ? 622 : 292;
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
      sizes={`(max-width: 800px) 100vw, ${imageWidth * 2}px`}
      layout="responsive"
      alt={value?.alt}
      placeholder="blur"
      // Data URL generated here: https://png-pixel.com/
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UQ8AAhUBSQV8WJQAAAAASUVORK5CYII="
    />
  ) : null;

  return (
    <figure
      className={`${styles.figure} ${styles[alignmentClass]}`}
      style={{ maxWidth: rem(imageWidth) }}>
      {image}
      <figcaption className={styles.caption}>
        {value.caption && <span>{value.caption}</span>}{" "}
        {creditLine && <span dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />}
      </figcaption>
    </figure>
  );
};

export default PostBodyImage;
