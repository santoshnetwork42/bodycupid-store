// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  // basePath: '/react/riode/demo-1',
  // distDir: 'build',
  reactStrictMode: true,
  async rewrites() {
    const paylolad = [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];

    if (process.env.BLOG_URL) {
      paylolad.push(
        {
          source: "/blog",
          destination: process.env.BLOG_URL,
        },
        {
          source: "/blog/:path*",
          destination: `${process.env.BLOG_URL}/:path*`,
        }
      );
    }

    return paylolad;
  },

  async redirects() {
    return [
      {
        source: "/product/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/pages/login",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pages/cart",
        destination: "/?cart=1",
        permanent: false,
      },
      {
        source: "/shop",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/shop/:slug*",
        destination: "/collections/all",
        permanent: true,
      },
      {
        source: "/categories/:slug*",
        destination: "/collections/:slug*",
        permanent: true,
      },
      {
        source: "/elements",
        destination: "/",
        permanent: true,
      },
      {
        source: "/elements/:any",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDIA_URL,
        // port: '',
        pathname: "/public/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourcemaps: false }
);
