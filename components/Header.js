import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "utils/useMediaQuery";
import { rem } from "utils/units";

import styles from "components/Header.module.css";

export default function Header({ children }) {
  const router = useRouter();
  const pathName = router.pathname;
  const active = styles.navItemActive;
  const isMedium = useMediaQuery(`(min-width: ${rem(820)})`);

  const navLinks = (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${pathName === "/" ? active : ""}`}>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            pathName.startsWith("/writing") ||
            pathName.startsWith("/novels") ||
            pathName.startsWith("/short-stories")
              ? active
              : ""
          }`}>
          <Link className={styles.navLink} href="/writing">
            Writing
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            pathName.startsWith("/posts") || pathName.startsWith("/categories") ? active : ""
          }`}>
          <Link className={styles.navLink} href="/posts">
            Blog
          </Link>
        </li>
        <li className={`${styles.navItem} ${pathName === "/contact" ? active : ""}`}>
          <Link className={styles.navLink} href="/contact">
            Contact
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            className={styles.shareButton}
            href="https://twitter.com/SandiPlewis"
            aria-label="Follow Sandi on Twitter"
            target="_blank"
            rel="noopener noreferrer">
            {isMedium && <span>Follow</span>}
            <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
              <use xlinkHref="#icon-twitter" />
            </svg>
            {!isMedium && <span>Follow Sandi on Twitter</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={styles.header}>
      {children}
      <div className={styles.nameAndTitle}>
        <p className={styles.name}>
          <Link className={styles.nameLink} href="/">
            Sandi Plewis
          </Link>
        </p>
        <p className={styles.title}>Author/editor</p>
      </div>
      {navLinks}
    </header>
  );
}
