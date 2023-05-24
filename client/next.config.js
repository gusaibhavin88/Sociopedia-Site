/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fontawesome.com",
      "http://localhost:5001",
      "res.cloudinary.com",
      "https://widget.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
