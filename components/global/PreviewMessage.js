import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import styles from "components/global/PreviewMessage.module.css";

// See: https://nextjs.org/docs/advanced-features/preview-mode

export default function PreviewMessage() {
  const router = useRouter();
  const { status } = useSession();

  const signOutButton =
    status === "authenticated" ? (
      <button onClick={() => signOut({ callbackUrl: "/api/exit-preview" })}>Sign out</button>
    ) : null;

  return router.isPreview ? (
    <div className={styles.previewMessage}>Preview mode {signOutButton}</div>
  ) : null;
}
