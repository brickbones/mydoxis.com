import { GraphQLClient } from 'graphql-request'

export function shopify({ query, variables }) {
  const client = new GraphQLClient(
    `https://${process.env.SHOPIFY_URL}/api/2021-04/graphql.json`,
    {
      headers: { 'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_KEY },
    }
  )

  return client.request(query, variables)
}
