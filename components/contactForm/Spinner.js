import styles from "components/contactForm/Spinner.module.css";

export default function Spinner() {
  return (
    <div role="progressbar" aria-valuetext="Loading">
      <div className={styles.spinner} aria-hidden="true"></div>
    </div>
  );
}
