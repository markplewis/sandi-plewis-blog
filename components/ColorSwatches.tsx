export default function ColorSwatches({ pageColors }) {
  const { colors } = pageColors;
  if (!colors) {
    return null;
  }
  const pO = colors.primaryOriginal;
  const p = colors.primary; // Adjusted
  const s = colors.secondary; // Original
  // const sX = colors.secondaryAdjusted;

  return (
    <div style={{ clear: "both" }}>
      <h3>Page colors</h3>
      <p>Primary color has been altered, secondary color has not:</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          justifyContent: "start",
          gap: "1px"
        }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: `rgb(${pO.r}% ${pO.g}% ${pO.b}%)`,
            color: pO.contrast < 0 ? "white" : "black",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          Pr
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: `rgb(${s.r}% ${s.g}% ${s.b}%)`,
            color: s.contrast < 0 ? "white" : "black",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          Sc
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: `rgb(${p.r}% ${p.g}% ${p.b}%)`,
            color: p.contrast < 0 ? "white" : "black",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          Pr
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: `rgb(${s.r}% ${s.g}% ${s.b}%)`,
            color: s.contrast < 0 ? "white" : "black",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          Sc
        </div>
      </div>
    </div>
  );
}
