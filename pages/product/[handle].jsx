import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Image from 'next/image'
import Client from 'shopify-buy'
import Layout from '../../components/layout'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
})

export default function Product({ product, helpers }) {
  const { locale } = useRouter()
  const [state, setState] = useState({
    variant: [...product.variants[0].selectedOptions],
    price: product.variants[0].priceV2.amount,
    quantity: 1,
  })

  SwiperCore.use([Autoplay, Pagination])

  function isVariantAvailable() {
    return product.availableForSale
      ? _.find(product.variants, { selectedOptions: state.variant }).available
      : false
  }

  function handleChange(e) {
    const i = state.variant.findIndex(
      ({ name }) => name === e.target.dataset.option
    )

    let newState = {
      variant: state.variant,
      price: _.find(product.variants, {
        selectedOptions: state.variant,
      }).priceV2.amount,
    }

    newState.variant[i] = {
      name: e.target.dataset.option,
      value: e.target.value,
    }

    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  function handleClick() {
    helpers.addProductToCart(
      _.find(product.variants, {
        selectedOptions: state.variant,
      }).id,
      state.quantity
    )
  }

  let description = product.description
  const regex = /(.*)======(.*)/
  const translatedDesc = product.description.search(/======/)
  if (translatedDesc !== -1) {
    locale === 'en'
      ? (description = product.description.match(regex)[1])
      : (description = product.description.match(regex)[2])
  }

  return (
    <Layout helpers={helpers}>
      <section className='lg:flex'>
        <div className='overflow-hidden md:h-screen lg:w-1/2'>
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          >
            {product.images.map(({ id, src, altText }) => (
              <SwiperSlide key={id}>
                <div className='h-screen'>
                  <Image
                    className='object-cover'
                    src={src}
                    alt={altText}
                    layout='fill'
                    quality='85'
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='relative justify-center lg:w-1/2 lg:flex lg:flex-col bg-gradient-to-r from-gray-200 to-gray-300'>
          <div className='text-lg text-right'>
            {!product.availableForSale && (
              <span className='inline-block px-6 py-2 mt-10 text-xl tracking-wide text-gray-300 uppercase bg-gray-500 md:right-0 md:absolute md:top-20 font-display'>
                Out of stock
              </span>
            )}
            <div className='p-10 text-left md:p-20'>
              {product.productType && (
                <span className='inline-block px-1.5 py-0.5 text-xs font-bold tracking-wider text-orange-500 uppercase bg-orange-200 rounded-sm'>
                  {product.productType}
                </span>
              )}
              <h1 className='text-5xl font-bold'>{product.title}</h1>
              <h4 className='mb-10 text-3xl font-bold text-gray-500'>{`${product.variants[0].priceV2.currencyCode} $${state.price}`}</h4>
              {description && <p className='mb-10'>{description}</p>}
              <div className='flex flex-col text-base sm:items-end sm:flex-row'>
                {_.map(product.options, ({ id, name, values }) => {
                  return (
                    <label className='m-1.5' key={id}>
                      {`${name}:`}
                      <select
                        className='block w-20 px-2 py-1 mt-2 bg-gray-100 border border-gray-400'
                        onChange={handleChange}
                        data-option={name}
                      >
                        {_.map(values, (value) => {
                          return (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  )
                })}
                <label className='m-1.5'>
                  Quantity:
                  <input
                    className='block w-20 px-2 py-1 mt-2 bg-gray-100 border border-gray-400'
                    type='number'
                    min={1}
                    step={1}
                    value={state.quantity}
                    onChange={(e) =>
                      setState((prevState) => {
                        return {
                          ...prevState,
                          quantity: parseInt(e.target.value),
                        }
                      })
                    }
                  />
                </label>
                <button
                  className='w-full m-1.5 flex-1 px-4 py-1.5 bg-orange-500 rounded whitespace-nowrap text-gray-50 font-bold disabled:bg-gray-400 disabled:text-gray-300'
                  disabled={!isVariantAvailable()}
                  onClick={handleClick}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []
  const products = await client.product.fetchAll(50)

  _.forEach(locales, (locale) => {
    _.forEach(products, (product) => {
      paths.push({
        params: { handle: product.handle },
        locale,
      })
    })
  })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const {
    availableForSale,
    description,
    id,
    images,
    options,
    productType,
    title,
    variants,
    vendor,
  } = await client.product.fetchByHandle(params.handle)

  return {
    props: {
      handle: params.handle,
      product: {
        availableForSale,
        description,
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
              selectedOptions: selectedOptions.map(({ name, value }) => {
                return {
                  name,
                  value,
                }
              }),
              title,
            }
          }
        ),
        vendor,
      },
    },
  }
}
