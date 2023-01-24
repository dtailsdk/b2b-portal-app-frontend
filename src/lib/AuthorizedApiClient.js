import axios from 'axios'
import { getSessionToken } from '@shopify/app-bridge-utils'

export class AuthorizedApiClient {
  constructor (appBridge, app) {
    this.app = app
    this.axios = axios.create()
    // intercept all requests on this axios instance
    this.axios.interceptors.request.use(function (config) {
      return getSessionToken(appBridge)
        .then((token) => {
          // append your request headers with an authenticated token
          config.headers['Authorization'] = `Bearer ${token}`
          return config
        })
    })
  }

  getAuthorizedData(setShopName){
    this.axios({
      baseURL: BACKEND_URL,
      method: 'GET',
      url: `/app/api/shops/needs_auth?app=${this.app}`,
    })
    .then((response) => {
      console.log('Response from service that needs session token authorization', response.data)
      setShopName(response.data.shop.name)
    }, (error) => {
      console.log('error', error)
    })
  }

  getProducts(setProducts){
    this.axios({
      baseURL: BACKEND_URL,
      method: 'GET',
      url: `/app/api/shops/products?app=${this.app}`,
    })
    .then((response) => {
      console.log('Response from service that gets products', response.data)
      setProducts(response.data)
    }, (error) => {
      console.log('error', error)
    })
  }
}