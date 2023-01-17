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
  const app = useAppBridge()
  const apiClient = new AuthorizedApiClient(app)
  const { t, i18n } = useTranslation()
  useEffect(() => {
    if (props.locale) {
      i18n.changeLanguage(props.locale.substring(0, 2))
    }
  }, [])

  useEffect(() => {
    apiClient.getAuthorizedData(setShopName)
  }, [])

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title='Hello world app!' sectioned>
            <Text color='success'>
              {t('card.text', { shopName })}
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page >
  )
}

export default Index