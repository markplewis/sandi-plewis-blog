import Link from "next/link";
import { useRouter } from "next/router";

import { BASE_URL } from "env/constants";

import styles from "components/global/ShareTools.module.css";

function encodeUrlParams(params = {}) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&");
}

export default function ShareTools({ text, position = "", align = "" }) {
  const router = useRouter();
  const url = `${BASE_URL}${router.asPath}`;
  const positionClass = position === "vertical" ? styles.shareToolsVertical : "";
  const alignmentClass = align === "right" ? styles.shareToolsAlignRight : "";

  // Inspiration: https://www.tunnelbear.com/blog/why-we-created-our-own-social-media-buttons-on-our-website/
  const twitterURL = `https://twitter.com/share?${encodeUrlParams({ url, text })}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const emailURL = `mailto:?body=${text} - ${url}`;

  return (
    <div className={`${styles.shareTools} ${positionClass} ${alignmentClass}`}>
      <Link
        className={styles.shareTool}
        href={twitterURL}
        aria-label="Share on Twitter"
        target="_blank"
        rel="noopener noreferrer">
        <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
          <use xlinkHref="#icon-twitter" />
        </svg>
      </Link>
      <Link
        className={styles.shareTool}
        href={facebookURL}
        aria-label="Share on Facebook"
        target="_blank"
        rel="noopener noreferrer">
        <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
          <use xlinkHref="#icon-facebook" />
        </svg>
      </Link>
      <Link
        className={styles.shareTool}
        href={emailURL}
        aria-label="Share via email"
        target="_blank"
        rel="noopener noreferrer">
        <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
          <use xlinkHref="#icon-email" />
        </svg>
      </Link>
    </div>
  );
}
