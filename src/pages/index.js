import { 
  FooterHelp, 
  Link, 
  Text, 
 } from '@shopify/polaris'
import { useTranslation, Trans } from 'react-i18next'
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
          <Card title='dtails B2B portal' sectioned>
            <Text>
              {t('card.welcome', { shopName })}
              <br /><br />
            </Text>
          </Card>
          {/*
          <Card title='dtails B2B portal app' sectioned>
            <Text key='info' color='success'>
              {t('card.text', { shopName })}
              <br /><br />
            </Text>
              First five products:
              {products.map(product => <Text key={product.id}>{product.node.title}<br /></Text>)}
          </Card>
          */}
        </Layout.Section>
        <Layout.Section>
          <FooterHelp>
            <Trans i18nKey='footer'>
              Læs mere
                <Link url='https://dtails.dk/' external={true}>
                her
            </Link>
            </Trans>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page >
  )
}

export default Index