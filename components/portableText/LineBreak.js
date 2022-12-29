import styles from "components/portableText/LineBreak.module.css";

const LineBreak = ({ value }) => {
  const { style } = value;
  return <hr className={`${styles.lineBreak} ${style === "thick" ? styles.lineBreakThick : ""}`} />;
};

export default LineBreak;
