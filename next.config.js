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
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pages/login",
        destination: "/",
        permanent: true,
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
      {
        protocol: "https",
        hostname: "media.bodycupid.com",
        // port: '',
        pathname: "/public/**",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
});

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourcemaps: false }
);
