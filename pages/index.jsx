import { useEffect } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Client from 'shopify-buy'
import Image from 'next/image'
import Layout from '../components/layout'
import SwiperCore, { Autoplay, Pagination, EffectFade } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import anime from 'animejs'
import { datocms } from '../lib/datocms'
import { m } from '../lib/helpers'

export default function Home({
  instagramPosts,
  products,
  helpers,
  datocmsData,
}) {
  const { locale } = useRouter()
  SwiperCore.use([Autoplay, Pagination, EffectFade])

  useEffect(() => {
    const cover = document.querySelectorAll('.swiper-slide')
    const cards = document.querySelectorAll('.card-container')
    const videos = document.querySelectorAll('.youtube')

    _.forEach(cards, (card) => {
      card.style.opacity = 0
    })

    _.forEach(videos, (video) => {
      video.style.opacity = 0
    })

    let observer = new IntersectionObserver((entries, observer) => {
      _.forEach(entries, (entry) => {
        if (entry.intersectionRatio > 0) {
          anime({
            targets: cards,
            opacity: [0, 1],
            scale: [0.85, 1],
            translateY: [100, 0],
            easing: 'spring(1, 80, 10, 0)',
            delay: anime.stagger(200),
          })

          observer.unobserve(entry.target)
        }
      })
    })

    let videoObserver = new IntersectionObserver((entries, observer) => {
      _.forEach(entries, (entry) => {
        if (entry.intersectionRatio > 0) {
          anime({
            targets: entry.target,
            opacity: [0, 1],
            scale: [0.85, 1],
            translateY: [100, 0],
            easing: 'spring(1, 80, 10, 0)',
            delay: 250,
          })

          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(document.querySelector('.grid'))
    _.forEach(document.querySelectorAll('.youtube'), (video) =>
      videoObserver.observe(video)
    )

    window.addEventListener('scroll', (e) => {
      if (cover) {
        _.forEach(cover, (slide) => {
          slide.style.setProperty('--scroll', window.scrollY / 3 + 'px')
        })
      }
    })
  }, [])

  const {
    video,
    featuredImages,
    title,
    subtitle,
    description,
    youtube01,
    youtube02,
    youtube03,
    instagram,
  } = datocmsData.home

  return (
    <Layout helpers={helpers}>
      <section className='relative hero'>
        <div className='absolute w-full flex items-center justify-center h-screen px-10 py-32 z-10 pointer-events-none'>
          <img
            className='absolute hidden w-3/5 sm:block logo'
            src='/svg/doxis-full.svg'
            alt='Logo DOXIS'
          />
          <img
            className='absolute block w-3/5 p-8 sm:p-0 sm:hidden logo'
            src='/svg/doxis-letter.svg'
            alt='Logo DOXIS'
          />
          <img
            className='absolute w-full p-10 sm:p-0 sm:w-1/3 symbol'
            src='/svg/doxis.svg'
            alt='Symbol DOXIS'
          />
        </div>
        <Swiper
          pagination={{ clickable: true }}
          effect='fade'
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
        >
          {/* <SwiperSlide>
            <div className='relative'>
              <div className='flex items-center justify-center h-screen px-10 py-32'>
                <video
                  className='video-bg absolute object-cover h-screen w-screen top-0 left-0 z-[-1]'
                  poster='/video/bg.jpg'
                  loop
                  muted
                  autoPlay
                  playsInline
                >
                  <source src={video.url} type={video.mimeType} />
                </video>
              </div>
            </div>
          </SwiperSlide> */}

          {featuredImages.length > 0 &&
            featuredImages.map(({ url, alt }, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className='relative'>
                    <div className='flex items-center justify-center h-screen px-10 py-32'>
                      <Image
                        src={url}
                        alt={alt}
                        layout='fill'
                        objectFit='cover'
                        unoptimized={process.env.NODE_ENV === 'development'}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </section>

      <section className='pb-32 text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-center text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          {locale === 'en' ? 'Fresh & New' : 'Nuevos Productos'}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {_.map(
              _.filter(
                products,
                (product) => product.productType !== 'Socks'
              ).slice(0, 16),
              (product) => {
                return (
                  <div
                    key={product.id}
                    className='card-container flex flex-col'
                  >
                    <figure className='transition transform bg-gray-100 card flex flex-col flex-1'>
                      <Link
                        href={`/product/${product.handle}/`}
                        locale={locale}
                      >
                        <a>
                          <div className='aspect-w-2 aspect-h-3 loading'>
                            <Image
                              src={product.images[0].src}
                              alt={product.handle}
                              objectFit='cover'
                              layout='fill'
                              unoptimized={
                                process.env.NODE_ENV === 'development'
                              }
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
              }
            )}
          </div>
        </div>
      </section>

      <section className='pb-32 overflow-hidden text-right'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-center md:text-right text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          <span className='block'>{title}</span>
          <span className='block text-2xl lg:text-3xl'>{subtitle}</span>
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <div
            className='relative text-lg max-w-prose z-10 md:text-xl lg:mb-24 markdown'
            dangerouslySetInnerHTML={{ __html: m(description) }}
          />
          <div className='mb-12 lg:pl-96'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                className='youtube'
                title={youtube01.title}
                width={youtube01.width}
                height={youtube01.height}
                src={`https://www.youtube-nocookie.com/embed/${youtube01.providerUid}?controls=0`}
                frameBorder='0'
                allowFullScreen
              />
              {_.map(Array(5), (circle, i) => {
                return (
                  <div
                    key={i}
                    className={`bg-orange-500 hidden md:block w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-orange-500 bg-opacity-25 rounded-full circle-0${i} z-[-1]`}
                  />
                )
              })}
            </div>
          </div>
          <div className='mb-12 lg:pr-96 lg:pl-10'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                className='youtube'
                title={youtube02.title}
                width={youtube02.width}
                height={youtube02.height}
                src={`https://www.youtube-nocookie.com/embed/${youtube02.providerUid}?controls=0`}
                frameBorder='0'
                allowFullScreen
              />
            </div>
          </div>
          <div className='lg:pr-32 lg:pl-96'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                className='youtube'
                title={youtube03.title}
                width={youtube03.width}
                height={youtube03.height}
                src={`https://www.youtube-nocookie.com/embed/${youtube03.providerUid}?controls=0`}
                frameBorder='0'
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className='pb-32 bg-gradient-to-r from-gray-200 to-gray-300'>
        <a
          href='https://www.instagram.com/mydoxis/'
          target='_blank'
          rel='noreferrer'
        >
          <h1 className='items-center px-10 py-4 mb-10 text-3xl md:text-4xl text-center text-orange-900 uppercase bg-orange-500 fill-current sm:flex md:inline-flex md:my-20 font-display'>
            <svg
              className='hidden mr-3 sm:inline-block'
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
            >
              <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
            </svg>
            @mydoxis
          </h1>
        </a>

        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {instagram.map(({ url, blurUpThumb, alt }, i) => {
            return (
              <SwiperSlide className='p-8 sm:p-4' key={i}>
                <div
                  className='overflow-hidden rounded-md aspect-w-1 aspect-h-1 bg-cover'
                  style={{ backgroundImage: `url(${blurUpThumb})` }}
                >
                  <Image
                    src={url}
                    alt={alt}
                    layout='fill'
                    objectFit='cover'
                    unoptimized={process.env.NODE_ENV === 'development'}
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const datocmsData = await datocms({
    query: `query Home($locale: SiteLocale) {
      home(locale: $locale) {
        video {
          url
          blurUpThumb
        }
        featuredImages {
          url
          blurUpThumb
          alt
        }
        title
        subtitle
        description
        youtube01 {
          height
          provider
          providerUid
          url
          width
          title
        }
        youtube02 {
          height
          provider
          providerUid
          title
          url
          width
        }
        youtube03 {
          height
          provider
          providerUid
          title
          url
          width
        }
        instagram {
          url
          blurUpThumb
          alt
        }
      }
    }`,
    variables: { locale: context.locale },
  })

  const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  })

  const products = await client.product.fetchAll(100)
  // const collections = await client.collection.fetchAllWithProducts()
  // const collectionId = _.find(collections, {
  //   handle: 'doxis',
  // }).id

  // let { handle, description, descriptionHtml, id, image, title, products } =
  //   await client.collection.fetchWithProducts(collectionId, {
  //     productsFirst: 100,
  //   })

  let posts = [
    {
      url: 'CO8lXUqHJPs',
      src: '/img/186286102_3790420714403071_2500341130161278253_n.jpg',
    },
    {
      url: 'CO3ykb2HvUa',
      src: '/img/185352763_1330088814055566_8590926752495608923_n.jpg',
    },
    {
      url: 'CORPcxenzLt',
      src: '/img/179056325_453645502388291_6008362691021113946_n.jpg',
    },
    {
      url: 'CNqiNNAHRaS',
      src: '/img/172542170_885844758655781_5338761584260565207_n.jpg',
    },
    {
      url: 'CNILatcHw22',
      src: '/img/167069742_448413056444823_4158873361955546940_n.jpg',
    },
    {
      url: 'CITlgzrHPvu',
      src: '/img/129100307_126858045741802_2132416784646311528_n.jpg',
    },
    {
      url: 'CFJIHUZHOou',
      src: '/img/119204178_2782535555325339_7673312928488229798_n.jpg',
    },
    {
      url: 'CFCm_Cln8rC',
      src: '/img/119125418_758145701706270_3943952648340557262_n.jpg',
    },
    {
      url: 'CEx7nF_HY_K',
      src: '/img/118882324_617993035543269_3131857677561567314_n.jpg',
    },
    {
      url: 'CEwgveWHk11',
      src: '/img/118823390_241756107097586_7349958521107754135_n.jpg',
    },
    {
      url: 'CDwKh7FHuCO',
      src: '/img/117174730_660897934512370_4601225435968257277_n.jpg',
    },
    {
      url: 'CDC51xAnCCa',
      src: '/img/111888703_2627439514137261_3849288409074560967_n.jpg',
    },
  ]

  return {
    props: {
      datocmsData,
      instagramPosts: posts,
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
            }
          }
        ),
        ['createdAt']
      ).reverse(),
    },
  }
}
