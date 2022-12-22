/** @type {import('next').NextConfig} */

// See: https://nextjs.org/docs/api-reference/next.config.js/introduction

const nextConfig = {
  reactStrictMode: true,
  // See: https://nextjs.org/docs/advanced-features/compiler
  compiler: {
    styledComponents: true
  },
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
      }
      // {
      //   source: "/studio",
      //   destination: `https://${envProd ? "admin" : "dev-admin"}.sandiplewis.com/`,
      //   permanent: true
      // }
    ];
  }
};

module.exports = nextConfig;
