export function getPageStyles(pageColors = {}) {
  if (!pageColors?.primary || !pageColors?.secondary) {
    return "";
  }
  const { primary, secondary } = pageColors;
  return `
    body {
      --page-color-primary: rgb(${primary.r}% ${primary.g}% ${primary.b}%);
      --page-color-primary-diluted: rgb(${primary.r}% ${primary.g}% ${primary.b}% / 10%);
      --page-color-secondary: rgb(${secondary.r}% ${secondary.g}% ${secondary.b}%);
      --page-color-secondary-diluted: rgb(${secondary.r}% ${secondary.g}% ${secondary.b}% / 10%);
    }
  `;
}
