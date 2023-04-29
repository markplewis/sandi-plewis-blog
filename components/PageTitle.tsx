import { useEffect, useRef } from "react";
import { useApp } from "~/utils/useApp";

import styles from "~/components/PageTitle.module.css";

export default function PageTitle({ className = "", centered = false, children }) {
  const { dispatchApp } = useApp();
  const skipLinkTargetRef = useRef(null);

  useEffect(() => {
    dispatchApp({ skipLinkTargetRef });
  }, [dispatchApp]);

  const classNames = [className, centered ? styles.centered : ""].filter(c => c).join(" ");

  return (
    <h1 id="skip-link-target" className={classNames} tabIndex={-1} ref={skipLinkTargetRef}>
      {children}
    </h1>
  );
}
