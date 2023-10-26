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
  async redirects() {
    return [
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

  rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      { source: "/sitemap.xml", destination: "/api/feed/site-map" },
      {
        source: "/sitemap_products.xml",
        destination: "/api/feed/sitemap-products",
      },
      { source: "/sitemap_pages.xml", destination: "/api/feed/sitemap-pages" },
      {
        source: "/sitemap_collections.xml",
        destination: "/api/feed/sitemap-collections",
      },
      { source: "/sitemap_blogs.xml", destination: "/api/feed/sitemap-blogs" },
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
});

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourcemaps: false }
);
