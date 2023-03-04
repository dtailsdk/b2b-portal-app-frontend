import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AppProvider, Frame } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'
import { withRouter } from 'next/router'
import axios from 'axios'
import '../utils/i18n'
import '@shopify/polaris/build/esm/styles.css'

class B2BPortal extends App {
  state = {
    checked: false,
  }

  checkIfAppIsInstalled(shop, host, app) {
    if (shop && !this.state.checked) {
      //Call to backend without auhtorization (session token) in order to determine whether to trigger OAuth flow or not
      axios({
        baseURL: BACKEND_URL,
        method: 'GET',
        url: `/app/api/shops?shop=${shop}&app=${app}`,
      })
        .then(response => {
          console.log('Response from server on /app/api/shop:', response.data)
          if (response.data.installedAndUpdated) {
            console.log('Shop was already installed and scopes are up to date', response.data.shop.name)
            if (host) {
              this.setState({ checked: true })
            } else {
              console.log('Host query parameter was not set (re-install) - redirecting to OAuth flow')
              window.location.href = `${BACKEND_URL}/shopify/auth/install?shop=${shop}&app=${app}`
            }
          } else {
            console.log('Shop scopes have updated - redirecting to OAuth flow')
            window.location.href = `${BACKEND_URL}/shopify/auth/install?shop=${shop}&app=${app}`
          }
        }, (error) => {
          console.log('An error occurred - redirecting to OAuth flow', error)
          window.location.href = `${BACKEND_URL}/shopify/auth/install?shop=${shop}&app=${app}`
        })
    }
  }

  getContent() {
    const shop = this.props.router.query.shop
    const host = this.props.router.query.host
    const app = this.props.router.query.app
    this.checkIfAppIsInstalled(shop, host, app)

    if (this.state.checked && host) {
      const { Component, pageProps } = this.props
      pageProps.app = app
      pageProps.locale = this.props.router.query.locale
      const config = { apiKey: SHOPIFY_APPS_CONFIGURATION[app].shopifyAppKey, host: host, forceRedirect: true }

      return (
        <Provider config={config}>
          <AppProvider>
            <Frame>
              <Component {...pageProps} />
            </Frame>
          </AppProvider>
        </Provider>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>dtails B2B portal</title>
          <meta charSet='utf-8' />
        </Head>
        {this.getContent()}
      </React.Fragment>
    )
  }
}

export default withRouter(B2BPortal)