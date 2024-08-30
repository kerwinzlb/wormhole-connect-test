/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiHost: 'http://192.168.10.220:3003/api/front',
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['assets.maccarianagency.com'],
  },
};

module.exports = nextConfig;

// // next.config.js
// module.exports = {
//   images: {
//     domains: ['assets.maccarianagency.com'],
//   },
// }
