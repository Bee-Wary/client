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
    },
    {
      protocol: 'https',
      hostname: "picsum.photos",
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: "fastly.picsum.photos",
      port: '',
      pathname: '/**',
    }]
  }
});

module.exports = nextConfig;
