import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

import styles from "components/global/PreviewMessage.module.css";

// See: https://nextjs.org/docs/advanced-features/preview-mode

export default function PreviewMessage() {
  const router = useRouter();
  const { status } = useSession();

  // Since Next.js' preview mode cookies get deleted when the browser is closed but Auth.js
  // sessions persist, we must verify that the user has both an active session as well as the
  // required cookies. If not, then they will be logged out.
  // See: https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
  if (status === "authenticated" && !router.isPreview) {
    signOut();
  }

  return status === "authenticated" && router.isPreview ? (
    <div className={styles.previewMessage}>
      Preview mode{" "}
      <button onClick={() => signOut({ callbackUrl: "/api/exit-preview" })}>Sign out</button>
    </div>
  ) : null;
}
