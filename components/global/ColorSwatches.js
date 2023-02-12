export default function ColorSwatches() {
  return (
    <>
      <p>Original</p>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-primary-orig)",
          color: "var(--page-color-primary-text)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-secondary-orig)",
          color: "var(--page-color-secondary-text)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>
      <p>Altered</p>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-primary)",
          color: "var(--page-color-primary-text)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-secondary)",
          color: "var(--page-color-secondary-text)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>
    </>
  );
}
