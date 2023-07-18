/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['loremflickr.com'],
    },
    node: {
        net: 'empty',
    },
};

module.exports = nextConfig;
