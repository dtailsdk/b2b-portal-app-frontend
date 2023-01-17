import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AppProvider, Frame } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'
import { withRouter } from 'next/router'
import '@shopify/polaris/build/esm/styles.css'
import axios from 'axios'
import '../utils/i18n'

class B2BPortal extends App {
  state = {
    checked: false,
  }

  checkIfShopWasInstalled(shop, host) {
    if (shop && !this.state.checked) {
      //Call to backend without auhtorization (session token) in order to determine whether to trigger OAuth flow or not
      axios({
        baseURL: BACKEND_URL,
        method: 'GET',
        url: '/app/shops?shop=' + shop,
      })
        .then(response => {
          console.log('Response from server on /app/shop:', response.data)
          if (response.data.appInstalled) {
            console.log('Shop was already installed', response.data.shop.name)
            if (host) {
              this.setState({ checked: true })
            } else {
              console.log('Host query parameter was not set (re-install) - redirecting to OAuth flow')
              window.location.href = BACKEND_URL + '/shopify/auth/install?shop=' + shop
            }
          } else {
            console.log('Shop name was not set - redirecting to OAuth flow')
            window.location.href = BACKEND_URL + '/shopify/auth/install?shop=' + shop
          }
        }, (error) => {
          console.log('An error occurred - redirecting to OAuth flow', error)
          window.location.href = BACKEND_URL + '/shopify/auth/install?shop=' + shop
        })
    }
  }

  getContent() {
    const shop = this.props.router.query.shop
    const host = this.props.router.query.host
    this.checkIfShopWasInstalled(shop, host)

    if (this.state.checked && host) {
      const { Component, pageProps } = this.props
      pageProps.locale = this.props.router.query.locale
      const config = { apiKey: SHOPIFY_APP_KEY, host: host, forceRedirect: true }
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
          <title>B2B Portal</title>
          <meta charSet="utf-8" />
        </Head>
        {this.getContent()}
      </React.Fragment>
    )
  }
}

export default withRouter(B2BPortal)