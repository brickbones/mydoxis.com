import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import _ from 'lodash'
import Client from 'shopify-buy'
import Link from 'next/link'
import Image from 'next/image'
import anime from 'animejs'

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

  function handleFilter(filter) {
    const cards = document.querySelectorAll('.card-container')

    if (filter === '*') {
      _.forEach(cards, (card) => {
        card.style.display = 'flex'
      })

      anime({
        targets: cards,
        opacity: [0, 1],
        scale: [0.85, 1],
        translateY: [100, 0],
        easing: 'spring(1, 80, 10, 0)',
        delay: anime.stagger(100),
      })
    } else {
      const cards = document.querySelectorAll(
        `.card-container[data-product-type=${filter}]`
      )
      const cardsHide = document.querySelectorAll(
        `.card-container:not([data-product-type=${filter}])`
      )

      _.forEach(cards, (card) => {
        card.style.display = 'flex'
      })
      _.forEach(cardsHide, (card) => {
        card.style.display = 'none'
      })

      anime({
        targets: cards,
        opacity: [0, 1],
        translateY: [100, 0],
        scale: [0.85, 1],
        easing: 'spring(1, 80, 10, 0)',
        delay: anime.stagger(100),
      })
    }
  }

  useEffect(() => {
    const cover = document.querySelector('.cover')
    const cards = document.querySelectorAll('.card-container')

    _.forEach(cards, (card) => {
      card.style.opacity = 0
    })

    anime({
      targets: cards,
      opacity: [0, 1],
      translateY: [100, 0],
      scale: [0.85, 1],
      easing: 'spring(1, 80, 10, 0)',
      delay: anime.stagger(100),
    })

    function handleScroll() {
      if (cover) cover.style.setProperty('--scroll', window.scrollY / 3 + 'px')
    }

    window.addEventListener('scroll', handleScroll)
    // return window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Layout helpers={helpers}>
      {collection.image.src && (
        <div className='aspect-w-2 aspect-h-1 md:aspect-w-3 md:aspect-h-1 overflow-hidden cover loading'>
          <Image src={collection.image.src} objectFit='cover' layout='fill' />
        </div>
      )}
      <section className='pb-32 text-center md:text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          {locale === 'en'
            ? `${collection.title} Collection`
            : `Colección ${collection.title}`}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          {filters.length > 0 && (
            <div className='mb-10 filters'>
              <button
                className={`px-2 py-1 text-sm tracking-wider uppercase rounded whitespace-nowrap m-1 cursor-pointer font-semibold ${
                  state === '*'
                    ? 'bg-orange-400 text-orange-900'
                    : 'bg-gray-400 text-gray-200'
                }`}
                data-filter='*'
                onClick={() => {
                  setState('*')
                  handleFilter('*')
                }}
              >
                {locale === 'en' ? 'View All' : 'Ver Todo'}
              </button>
              {_.map(filters, (filter, key) => {
                return (
                  <button
                    key={key}
                    className={`px-2 py-1 text-sm tracking-wider uppercase  rounded whitespace-nowrap m-1 cursor-pointer font-semibold ${
                      state === filter
                        ? 'bg-orange-400 text-orange-900'
                        : 'bg-gray-400 text-gray-200'
                    }`}
                    data-filter={filter}
                    onClick={() => {
                      setState(filter)
                      handleFilter(filter)
                    }}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>
          )}
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {_.map(collection.products, (product) => {
              return (
                <div
                  key={product.id}
                  className='card-container flex flex-col'
                  data-product-type={product.productType.toLowerCase()}
                >
                  <figure className='transition transform bg-gray-100 card flex flex-col flex-1'>
                    <Link href={`/product/${product.handle}/`} locale={locale}>
                      <a>
                        <div className='aspect-w-2 aspect-h-3 loading'>
                          <Image
                            src={product.images[0].src}
                            alt={product.handle}
                            objectFit='cover'
                            layout='fill'
                          />
                        </div>
                      </a>
                    </Link>
                    <figcaption className='px-4 py-2.5 text-base md:text-xs font-semibold tracking-wider text-center text-gray-500 uppercase flex flex-col flex-1 justify-center'>
                      {product.title}
                    </figcaption>
                  </figure>
                </div>
              )
            })}
          </div>
          <div
            className='mt-20 text-gray-900 text-lg md:text-xl max-w-prose'
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
    productsFirst: 100,
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
