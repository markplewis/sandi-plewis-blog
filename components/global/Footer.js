import Link from "next/link";

import styles from "components/global/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} href="/privacy-policy">
        Privacy policy
      </Link>
    </footer>
  );
}
