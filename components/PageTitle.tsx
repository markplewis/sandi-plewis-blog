import { useEffect, useRef } from "react";
import { useApp, SET_SKIP_LINK_TARGET } from "~/utils/useApp";

import styles from "~/components/PageTitle.module.css";

// Defining `ref` types: https://www.robinwieruch.de/typescript-react-useref/

export default function PageTitle({ className = "", centered = false, children = "" }) {
  const { dispatchApp } = useApp();
  const skipLinkTargetRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    dispatchApp({ type: SET_SKIP_LINK_TARGET, payload: skipLinkTargetRef });
  }, [dispatchApp]);

  const classNames = [className, centered ? styles.centered : ""].filter(c => c).join(" ");

  return (
    <h1 id="skip-link-target" className={classNames} tabIndex={-1} ref={skipLinkTargetRef}>
      {children}
    </h1>
  );
}
