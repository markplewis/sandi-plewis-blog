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
        stage: 3
      }
    ],
    ["@csstools/postcss-design-tokens", { valueFunctionName: "token" }]
  ]
};
