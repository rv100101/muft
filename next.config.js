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
        localesToKeep: ['en'], // Specify the locales you need
      })
    );
    return config;
  },
};

export default withPlugins([], nextConfig);
