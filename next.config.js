require("dotenv").config();
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_APP_KEY);
const backendUrl = JSON.stringify(process.env.BACKEND_URL);

module.exports = {
  webpack: (config) => {
    const env = { SHOPIFY_APP_KEY: apiKey, BACKEND_URL: backendUrl };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
};