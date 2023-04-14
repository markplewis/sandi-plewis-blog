import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import designTokens from "styles/design-tokens";
import { useApp } from "utils/useApp";
import useMediaQuery from "utils/useMediaQuery";
import { rem } from "utils/units";
import useEscapeKey from "utils/useEscapeKey";
import useOnClickOutside from "utils/useOnClickOutside";
import useWindowSize from "utils/useWindowSize";

import styles from "components/global/Header.module.css";

export default function Header() {
  const { breakpoints } = designTokens;
  const { dispatchApp } = useApp();
  const router = useRouter();
  const pathName = router.pathname;
  const active = styles.navItemActive;
  const isMedium = useMediaQuery(`(min-width: ${breakpoints.w820.value}rem)`);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHidden, setMenuHidden] = useState(true);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Adjust menu height and position to accommodate header
  const menuInlineStyles = {
    top: `${rem(headerHeight)}`,
    height: `calc(100% - ${rem(headerHeight)})`
  };

  // Measure header height
  const adjustMenuHeight = useCallback(() => {
    const header = headerRef.current;
    header && setHeaderHeight(header.offsetHeight);
  }, []);

  useWindowSize(adjustMenuHeight, 500);

  const setContentHidden = useCallback(
    hidden => {
      dispatchApp({ bodyContentHidden: hidden });
    },
    [dispatchApp]
  );

  // Lock scrolling while mobile nav menu is open
  useEffect(() => {
    dispatchApp({ bodyScrollLocked: menuOpen && !isMedium });
  }, [dispatchApp, isMedium, menuOpen]);

  const openMenu = () => {
    adjustMenuHeight();
    setMenuOpen(true);
    setMenuHidden(false);
  };

  const closeMenu = useCallback(
    e => {
      setMenuOpen(false);
      setContentHidden(false);

      if (e && e.type !== "keydown") {
        // Don't focus button when user clicked/tapped outside of menu to close it
        return;
      }
      const menuButton = menuButtonRef.current;
      menuButton?.focus();
    },
    [setContentHidden]
  );

  const handleMenuClickOutside = e => {
    const menuButton = menuButtonRef.current;
    if (e && menuButton?.contains(e.target)) {
      return;
    }
    closeMenu(e);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", () => closeMenu());
  }, [closeMenu, router.events]);

  // Close menu when user presses Escape key
  useEscapeKey(closeMenu);

  // Close menu when user clicks/taps outside of it
  useOnClickOutside(menuRef, handleMenuClickOutside);

  const handleMenuButtonClick = () => {
    !menuOpen ? openMenu() : closeMenu();
  };

  const navLinks = (
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
          className={styles.navLinkTwitter}
          href="https://twitter.com/SandiPlewis"
          aria-label="Follow Sandi on Twitter"
          target="_blank"
          rel="noopener noreferrer">
          <span className={styles.navLinkTwitterTextDesktop}>Follow</span>
          <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
            <use xlinkHref="#icon-twitter" />
          </svg>
          <span className={styles.navLinkTwitterTextMobile}>Follow Sandi on Twitter</span>
        </Link>
      </li>
    </ul>
  );

  const desktopNav = <nav className={styles.navDesktop}>{navLinks}</nav>;

  const mobileNav = (
    <>
      <button
        type="button"
        id="nav-menu-mobile-button"
        ref={menuButtonRef}
        onClick={handleMenuButtonClick}
        className={`${styles.navMobileButton} u-button-appearance-none`}
        aria-label={`${menuOpen ? "Close" : "Open"} navigation menu`}
        aria-controls="nav-menu-mobile"
        aria-expanded={menuOpen}>
        <svg role="img" aria-hidden={true} focusable={false} pointerEvents="none">
          <use xlinkHref="#icon-menu" />
        </svg>
      </button>
      <div
        id="nav-menu-mobile"
        ref={menuRef}
        className={`${styles.navMobile} ${
          menuOpen ? styles.navMobileRevealing : styles.navMobileHiding
        }`}
        style={menuInlineStyles}
        hidden={menuHidden}
        onAnimationEnd={() => {
          if (!menuOpen) {
            setMenuHidden(true);
          } else {
            setContentHidden(true);
          }
        }}>
        <nav>{navLinks}</nav>
      </div>
    </>
  );

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.nameAndTitle}>
        <p className={styles.name}>
          <Link className={styles.nameLink} href="/">
            Sandi Plewis
          </Link>
        </p>
        <p className={styles.title}>Author/editor</p>
      </div>
      {desktopNav}
      {mobileNav}
    </header>
  );
}
