import { suspend } from "suspend-react";
import { _checkAuth } from "@sanity/preview-kit";
import styles from "components/PreviewMessage.module.css";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const useCheckAuth = () =>
  suspend(() => _checkAuth(projectId, null), ["@sanity/preview-kit", "checkAuth", projectId]);

export default function PreviewMessage() {
  const isAuthenticated = useCheckAuth();
  return isAuthenticated ? <div className={styles.previewMessage}>Preview mode</div> : null;
}
