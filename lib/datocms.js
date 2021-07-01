import { GraphQLClient } from 'graphql-request'

export function datocms({ query, variables }) {
  const client = new GraphQLClient('https://graphql.datocms.com/', {
    headers: { authorization: `Bearer ${process.env.DATOCMS_TOKEN}` },
  })

  return client.request(query, variables)
}
