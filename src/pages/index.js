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
  const appBridge = useAppBridge()
  const apiClient = new AuthorizedApiClient(appBridge, props.app)
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
          <Card title='dtails B2B portal' sectioned>
            <Text>
              {t('card.welcome', { shopName })}
              <br /><br />
            </Text>
          </Card>
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