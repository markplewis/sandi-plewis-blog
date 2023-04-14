import Image from "next/image";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

export default function AuthorImage({ className, url, width, alt, blur }) {
  return (
    <div className={className} style={{ maxWidth: `${width}px` }}>
      <Image
        src={urlFor(url)
          .width(width * 2)
          .height(width * 2)
          .url()}
        width={width}
        height={width}
        alt={alt}
        placeholder="blur"
        blurDataURL={blur || imageBlurDataURL}
        className="responsive-image"
      />
    </div>
  );
}
