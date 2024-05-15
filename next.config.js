/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "placehold.co",
      port: '',
      pathname: '/**',
    }]
  }
});

module.exports = nextConfig;
