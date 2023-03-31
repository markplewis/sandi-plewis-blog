import Link from "next/link";

import styles from "components/MoreLink.module.css";

export default function MoreLink({
  as,
  href,
  text,
  align = "start",
  fgColor = "--color-white",
  bgColor = "--color-dark-gray"
}) {
  let alignClass;
  switch (align) {
    case "start":
      alignClass = styles.moreLinkContainerLeft;
      break;
    case "center":
      alignClass = styles.moreLinkContainerCenter;
      break;
    case "end":
    default:
      alignClass = styles.moreLinkContainerRight;
      break;
  }
  return (
    <div className={`${styles.moreLinkContainer} ${alignClass}`}>
      <Link
        className={styles.moreLink}
        style={{ backgroundColor: `var(${bgColor})`, color: `var(${fgColor})` }}
        as={as}
        href={href}>
        <span>{text}</span>
        <svg
          className={styles.moreLinkSVG}
          fill={`var(${fgColor})`}
          role="img"
          pointerEvents="none"
          focusable={false}
          aria-hidden={true}>
          <use xlinkHref="#icon-arrow-right" />
        </svg>
      </Link>
    </div>
  );
}
