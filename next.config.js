require("dotenv").config()
const webpack = require('webpack')

const backendUrl = JSON.stringify(process.env.BACKEND_URL)
const apiKey = JSON.stringify(process.env.SHOPIFY_APPS_CONFIGURATION)

module.exports = {
  webpack: (config) => {
    const env = { SHOPIFY_APPS_CONFIGURATION: JSON.parse(apiKey), BACKEND_URL: backendUrl }
    config.plugins.push(new webpack.DefinePlugin(env))
    return config
  },
}