// See: https://nextjs.org/docs/advanced-features/customizing-postcss-config

module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009"
        },
        stage: 3,
        features: {
          "custom-properties": false
        }
      }
    ],
    // See: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-env-function
    // See: https://blog.logrocket.com/why-you-should-use-css-env-9ee719ce0f24/
    [
      "postcss-env-function",
      {
        // `importFrom` is deprecated and may eventually change.
        // See: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-env-function#disabledeprecationnotice
        // See: https://github.com/csstools/postcss-plugins/discussions/192
        importFrom: "styles/css-env-variables.js",
        disableDeprecationNotice: true
      }
    ]
  ]
};

// Issues: https://github.com/vercel/next.js/issues/11494
