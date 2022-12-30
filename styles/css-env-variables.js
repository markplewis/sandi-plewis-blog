const { breakpoints: bp } = require("./js-env-variables");

/*
Unfortunately, it isn't possible to use CSS custom properties in media queries, like this:
`@media (min-width: var(--bp-768))`
See: https://bholmes.dev/blog/alternative-to-css-variable-media-queries/

However, it may soon be possible to use CSS environment variables in media queries, like this:
`@media (min-width: env(--bp-768))`
See: https://drafts.csswg.org/css-env-1/
  | "Because environment variables don’t depend on the value of anything drawn from a particular
  | element, they can be used in places where there is no obvious element to draw from, such as
  | in @media rules, where the var() function would not be valid."

Until then, we can polyfill this functionality via PostCSS.
See: https://blog.logrocket.com/why-you-should-use-css-env-9ee719ce0f24/
See: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-env-function
*/

module.exports = {
  environmentVariables: {
    // Media query breakpoints
    "--bp-480": `${bp.w480.rem}rem`,
    "--bp-600": `${bp.w600.rem}rem`,
    "--bp-768": `${bp.w768.rem}rem`,
    "--bp-820": `${bp.w820.rem}rem`,
    "--bp-1024": `${bp.w1024.rem}rem`,
    "--bp-1150": `${bp.w1150.rem}rem`,
    "--bp-1280": `${bp.w1280.rem}rem`,
    "--bp-1600": `${bp.w1600.rem}rem`
  }
};

// module.exports = {
//   environmentVariables: {
//     // Media query breakpoints
//     "--bp-480": "30rem", // 480px
//     "--bp-600": "37.5rem", // 600px
//     "--bp-768": "48rem", // 768px
//     "--bp-820": "51.25rem", // 820px
//     "--bp-1024": "64rem", // 1024px
//     "--bp-1150": "71.875rem", // 1150px
//     "--bp-1280": "80rem", // 1280px
//     "--bp-1600": "100rem" // 1600px
//   }
// };
