require("dotenv").config()
const webpack = require('webpack')

const backendUrl = JSON.stringify(process.env.BACKEND_URL)
const apiKey = JSON.stringify(process.env.SHOPIFY_APPS_CONFIGURATION)
const contactEmail = JSON.stringify(process.env.CONTACT_EMAIL)

module.exports = {
  webpack: (config) => {
    const env = { SHOPIFY_APPS_CONFIGURATION: JSON.parse(apiKey), BACKEND_URL: backendUrl, CONTACT_EMAIL: contactEmail }
    config.plugins.push(new webpack.DefinePlugin(env))
    return config
  },
}