import { Text } from '@shopify/polaris'
import { useTranslation } from 'react-i18next'
import { useAppBridge } from '@shopify/app-bridge-react'
import { useEffect } from 'react'
import { AuthorizedApiClient } from '../lib/AuthorizedApiClient'
import { useState } from 'react'
import {
  Card,
  Layout,
  Page,
} from '@shopify/polaris'

function Index(props) {
  const [shopName, setShopName] = useState('')
  const [products, setProducts] = useState([])
  const appBridge = useAppBridge()
  const apiClient = new AuthorizedApiClient(appBridge, props.app)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    if (props.locale) {
      i18n.changeLanguage(props.locale.substring(0, 2))
    }
  }, [])

  const onResponse = (response) => {
    setProducts(response)
  }

  useEffect(() => {
    apiClient.getAuthorizedData(setShopName)
    apiClient.getProducts(onResponse)
  }, [])

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title='B2B portal app!' sectioned>
            <Text color='success'>
              {t('card.text', { shopName })}
              <br /><br />
              First five products:
              {products.map(product => <div>{product.node.title}<br /></div>)}
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page >
  )
}

export default Index