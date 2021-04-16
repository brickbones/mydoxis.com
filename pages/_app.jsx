import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Client from 'shopify-buy'
import NProgress from 'nprogress'

import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '@fontsource/roboto-slab/latin-400.css'
import '@fontsource/roboto-slab/latin-700.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [state, setState] = useState({
    checkout: {
      lineItems: [],
    },
  })

  const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  })

  async function addProductToCart(variantId, quantity) {
    setState({
      checkout: await client.checkout.addLineItems(state.checkout.id, [
        { variantId, quantity },
      ]),
    })
  }

  async function removeProductFromCart(variantId) {
    setState({
      checkout: await client.checkout.removeLineItems(state.checkout.id, [
        variantId,
      ]),
    })
  }

  function cartCount() {
    return _.reduce(
      _.map(state.checkout.lineItems, (item) => item.quantity),
      (sum, n) => sum + n
    )
  }

  useEffect(() => {
    ;(async () => {
      if ('shopify-checkout-id' in localStorage) {
        setState({
          checkout: await client.checkout.fetch(
            localStorage.getItem('shopify-checkout-id')
          ),
        })
      }

      if (
        state.checkout.completedAt ||
        'shopify-checkout-id' in localStorage === false
      ) {
        const checkout = await client.checkout.create()
        setState({ checkout })
        localStorage.setItem('shopify-checkout-id', checkout.id)
      }
    })()

    const routeChangeStart = () => NProgress.start()
    const routeChangeComplete = () => NProgress.done()

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)
    router.events.on('routeChangeError', routeChangeComplete)
    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
      router.events.off('routeChangeError', routeChangeComplete)
    }
  }, [])

  return (
    <Component
      {...pageProps}
      helpers={{ addProductToCart, removeProductFromCart, cartCount }}
      checkout={state.checkout}
    />
  )
}
