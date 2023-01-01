export function rem(size = 1) {
  let defaultFontSize = 16;

  if (typeof window !== "undefined") {
    // Determine the user's default font size
    const userFontSize = Number(
      window.getComputedStyle(document.documentElement).fontSize.replace("px", "")
    );
    if (!Number.isNaN(userFontSize)) {
      defaultFontSize = userFontSize;
    }
  }
  return `${(size / defaultFontSize) * 1}rem`;
}
