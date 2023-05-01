const { withPlausibleProxy } = require("next-plausible");

// TODO: the following `import `doesn't seem to work, even when I rename this file to
// `next.config.mjs` and add `"type": "module"` to `package.json`, so I've copied the
// `envProd` variable into this file.
// `import { envProd } from "~/env/constants";`

const envProd =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SANITY_DATASET === "production";

// See: https://nextjs.org/docs/api-reference/next.config.js/introduction

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  // See: https://nextjs.org/docs/advanced-features/compiler
  // compiler: {
  //   styledComponents: true
  // },
  eslint: {
    // See also the `lint` script in `package.json`
    dirs: ["components", "env", "lib", "pages", "utils"]
  },
  // See: https://nextjs.org/docs/api-reference/next/image#configuration-options
  images: {
    // These apply globally. It doesn't seem possible to specify different sizes per image.
    // https://nextjs.org/docs/api-reference/next/image#device-sizes
    // https://github.com/vercel/next.js/issues/27547
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["cdn.sanity.io"]
  },
  async redirects() {
    return [
      {
        source: "/novels",
        destination: "/writing",
        permanent: true
      },
      {
        source: "/short-stories",
        destination: "/writing",
        permanent: true
      },
      {
        source: "/admin",
        destination: `https://${envProd ? "admin" : "dev-admin"}.sandiplewis.com/`,
        permanent: true
      }
    ];
  }
};

// See: https://github.com/4lejandrito/next-plausible#proxy-the-analytics-script
module.exports = withPlausibleProxy()(nextConfig);
