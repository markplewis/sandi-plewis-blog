import Link from "next/link";

import styles from "components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link className={styles.footerLink} href="/privacy-policy">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
