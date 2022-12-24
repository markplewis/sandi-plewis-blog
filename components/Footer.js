import Link from "next/link";
import { useRouter } from "next/router";

import styles from "components/Footer.module.css";

export default function Footer() {
  const router = useRouter();
  return router.pathname !== "/privacy-policy" ? (
    <footer className={styles.footer}>
      <Link className={styles.footerLink} href="/privacy-policy">
        Privacy policy
      </Link>
    </footer>
  ) : null;
}
