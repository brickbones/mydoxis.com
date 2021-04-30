import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import _ from 'lodash'
import Client from 'shopify-buy'
import Link from 'next/link'
import Image from 'next/image'

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
})

export default function Collection({ collection, helpers }) {
  const [state, setState] = useState('*')
  const { locale } = useRouter()
  let filters = []

  _.each(collection.products, (product) => {
    filters.push(product.productType.toLowerCase())
  })

  filters = _.sortBy(_.compact(_.uniq(filters)))

  return (
    <Layout helpers={helpers}>
      {collection.image.src && (
        <div className='aspect-w-3 aspect-h-1 overflow-hidden'>
          <Image src={collection.image.src} objectFit='cover' layout='fill' />
        </div>
      )}
      <section className='pb-32 text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-4xl text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          {locale === 'en'
            ? `${collection.title} Collection`
            : `Colección ${collection.title}`}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          {filters.length > 0 && (
            <div className='mb-10'>
              <button
                className={`px-2 py-1 text-sm tracking-wider uppercase rounded whitespace-nowrap m-1 cursor-pointer ${
                  state === '*'
                    ? 'bg-orange-400 text-orange-900'
                    : 'bg-gray-400 text-gray-200'
                }`}
                data-filter='*'
                onClick={() => setState('*')}
              >
                {locale === 'en' ? 'View All' : 'Ver Todo'}
              </button>
              {_.map(filters, (filter, key) => {
                return (
                  <button
                    key={key}
                    className={`px-2 py-1 text-sm tracking-wider uppercase  rounded whitespace-nowrap m-1 cursor-pointer ${
                      state === filter
                        ? 'bg-orange-400 text-orange-900'
                        : 'bg-gray-400 text-gray-200'
                    }`}
                    data-filter={filter}
                    onClick={() => setState(filter)}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          )}
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
            {_.map(collection.products, (product) => {
              return (
                <figure
                  key={product.id}
                  className={`transition transform bg-gray-100 card md:hover:scale-110 ${
                    state === '*' || state === product.productType.toLowerCase()
                      ? 'block'
                      : 'hidden'
                  }`}
                >
                  <Link href={`/product/${product.handle}/`} locale={locale}>
                    <a>
                      <div className='aspect-w-2 aspect-h-3'>
                        <Image
                          src={product.images[0].src}
                          alt={product.handle}
                          objectFit='cover'
                          layout='fill'
                        />
                      </div>
                    </a>
                  </Link>
                  <figcaption className='px-4 py-2 text-xs font-bold tracking-wider text-center text-gray-500 uppercase'>
                    {product.title}
                  </figcaption>
                </figure>
              )
            })}
          </div>
          <div
            className='mt-20 text-gray-900 md:text-lg dark:text-gray-400'
            dangerouslySetInnerHTML={{
              __html: collection.descriptionHtml,
            }}
          ></div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []
  const collections = ['doxis', 'juanfran', 'leyvan', 'victor-perez']

  _.forEach(locales, (locale) => {
    _.forEach(collections, (collection) => {
      paths.push({
        params: { handle: collection },
        locale,
      })
    })
  })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const collections = await client.collection.fetchAllWithProducts()
  const collectionId = _.find(collections, {
    handle: params.handle,
  }).id

  let {
    handle,
    description,
    descriptionHtml,
    id,
    image,
    title,
    products,
  } = await client.collection.fetchWithProducts(collectionId, {
    productsFirst: 50,
  })

  if (!image) image = { src: '' }

  return {
    props: {
      handle: params.handle,
      collection: {
        handle,
        description,
        descriptionHtml,
        id,
        image: { src: image.src },
        title,
        products: _.sortBy(
          products.map(
            ({
              availableForSale,
              description,
              handle,
              id,
              images,
              options,
              productType,
              createdAt,
              title,
              variants,
              vendor,
            }) => {
              return {
                availableForSale,
                description,
                descriptionHtml,
                handle,
                id,
                images: images.map(({ altText, id, src }) => {
                  return { altText, id, src }
                }),
                options: options.map(({ id, name, values }) => {
                  return {
                    id,
                    name,
                    values: values.map(({ value }) => value),
                  }
                }),
                productType,
                createdAt,
                title,
                variants: variants.map(
                  ({ available, id, priceV2, selectedOptions, title }) => {
                    return {
                      available,
                      id,
                      priceV2: {
                        amount: priceV2.amount,
                        currencyCode: priceV2.currencyCode,
                      },
                      selectedOptions: selectedOptions.map(
                        ({ name, value }) => {
                          return {
                            name,
                            value,
                          }
                        }
                      ),
                      title,
                    }
                  }
                ),
                vendor,
              }
            }
          ),
          ['createdAt']
        ).reverse(),
      },
    },
  }
}
