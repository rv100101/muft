import withPlugins from 'next-compose-plugins';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    config.plugins.push(
      new MomentLocalesPlugin({
        localesToKeep: ['en'], 
      })
    );

    return config;
  },
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
};

export default withPlugins([], nextConfig);
