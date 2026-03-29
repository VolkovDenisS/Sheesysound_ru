/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/webp'],
    },
    swcMinify: true,
    compress: true,
};
module.exports = nextConfig;
