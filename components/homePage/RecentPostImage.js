import Image from "next/image";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

export default function RecentPostImage({ className, url, width, height, sizes, alt, blur }) {
  return (
    <div className={className} style={{ maxWidth: `${width}px` }}>
      <Image
        src={urlFor(url)
          .width(width * 2)
          .height(height * 2)
          .url()}
        width={width}
        height={height}
        sizes={sizes}
        alt={alt}
        placeholder="blur"
        blurDataURL={blur || imageBlurDataURL}
        className="responsive-image"
      />
    </div>
  );
}
