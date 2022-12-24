import styles from "components/global/PreviewMessage.module.css";

export default function PreviewMessage() {
  return <div className={styles.previewMessage}>Preview mode</div>;
}

// import { suspend } from "suspend-react";
// import { _checkAuth } from "@sanity/preview-kit";
// import styles from "components/global/PreviewMessage.module.css";

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// // See: https://github.com/sanity-io/preview-kit#create-react-app-custom-token-auth

// const useCheckAuth = () =>
//   suspend(() => _checkAuth(projectId, null), ["@sanity/preview-kit", "checkAuth", projectId]);

// export default function PreviewMessage() {
//   const isAuthenticated = useCheckAuth();
//   return isAuthenticated ? <div className={styles.previewMessage}>Preview mode</div> : null;
// }
