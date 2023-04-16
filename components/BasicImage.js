import Image from "next/image";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

// https://www.sanity.io/docs/presenting-images
// https://nextjs.org/docs/basic-features/image-optimization
// https://nextjs.org/docs/api-reference/next/image

export default function BasicImage({
  image = undefined,
  width = 300,
  height = 400,
  alt = undefined,
  blur = undefined
}) {
  return image ? (
    <Image
      src={urlFor(image)
        .width(width * 2)
        .height(height * 2)
        .url()}
      width={width}
      height={height}
      alt={alt}
      placeholder="blur"
      blurDataURL={blur || imageBlurDataURL}
    />
  ) : null;
}
