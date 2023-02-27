
module.exports = {
    // basePath: '/react/riode/demo-1',
    // distDir: 'build',
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/shop',
                destination: '/collections/all',
                permanent: true
            },
            {
                source: '/shop/:slug*',
                destination: '/collections/all',
                permanent: true
            }
        ];
    },
}
