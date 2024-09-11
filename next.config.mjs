// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  webpack: (config, _options) => {

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    return config;
  },

};

export default nextConfig;
