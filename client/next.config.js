/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fontawesome.com"],
    domains: ["http://localhost:5001"],
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
