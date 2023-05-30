const imageDomain = process.env.NEXT_PUBLIC_IMAGES_DOMAIN;

/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    dirs: ['src', 'pages'],
  },
  reactStrictMode: true,
  images: {
    domains: [imageDomain],
  },
  swcMinify: true,
};
