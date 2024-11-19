/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "media.dodostatic.com",
            "media.dodostatic.net",
            "cdn.dodostatic.net",
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
