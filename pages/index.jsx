import { useEffect } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'
import Client from 'shopify-buy'
import Image from 'next/image'
import Layout from '../components/layout'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'

export default function Home({ instagramPosts, products, helpers }) {
  const { locale } = useRouter()
  SwiperCore.use([Autoplay, Pagination])

  return (
    <Layout helpers={helpers}>
      <section>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className='relative flex items-center justify-center h-screen px-10 py-32 bg-gradient-to-t from-[#F6581E88] via-[#F6581E00] to-[#F6581E00]'>
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
              <video
                className='video-bg absolute object-cover h-screen w-screen top-0 left-0 z-[-1]'
                poster='/video/bg.jpg'
                loop
                muted
                autoPlay
                playsInline
              >
                <source src='/video/bg.webm' type='video/webm' />
                <source src='/video/bg.mp4' type='video/mp4' />
              </video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='relative flex items-center justify-center h-screen px-10 py-32 bg-[#11182722] bg-gradient-to-t from-[#F6581E88] via-[#F6581E00] to-[#F6581E00]'>
              <Image
                className='z-[-1]'
                src='/img/banner-collection.jpg'
                objectFit='cover'
                layout='fill'
                quality='85'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='relative flex items-center justify-center h-screen px-10 py-32 bg-[#11182733] bg-gradient-to-t from-[#F6581E88] via-[#F6581E00] to-[#F6581E00]'>
              <video
                className='video-bg absolute object-cover h-screen w-screen top-0 left-0 z-[-1]'
                poster='/video/bg-video.jpg'
                loop
                muted
                autoPlay
                playsInline
              >
                <source src='/video/bg-video.webm' type='video/webm' />
                <source src='/video/bg-video.mp4' type='video/mp4' />
              </video>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className='pb-32 text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-center text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          {locale === 'en' ? 'Fresh & New' : 'Nuevos Productos'}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:md:grid-cols-4'>
            {_.map(products.slice(0, 8), (product) => {
              return (
                <figure
                  key={product.id}
                  className={`transition transform bg-gray-100 card md:hover:scale-110`}
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
                  <figcaption className='px-4 py-2 text-base md:text-xs font-bold tracking-wider text-center text-gray-500 uppercase'>
                    {product.title}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <section className='pb-32 overflow-hidden text-right'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-center text-orange-900 uppercase bg-orange-500 md:inline-block md:my-20 font-display'>
          {locale === 'en'
            ? 'A new era in urban fashion'
            : 'Nueva era en la moda urbana'}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <p className='mb-20 text-yellow-900 max-w-prose text-xl dark:text-gray-400'>
            {locale === 'en'
              ? "Since our beginnings we have styled and dressed many artists. Among them are Jowell & Randy and their dancers. They wear DOXIS' products for every major show since 2012."
              : 'Desde nuestros inicios hemos estilizado y vestido a muchos artistas. Entre ellos se encuentran Jowell & Randy y sus bailarines. Llevan los productos de DOXIS en todos los espectáculos importantes desde 2012.'}
          </p>
          <div className='mb-12 lg:pl-96'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                title='Jowell y Randy x J Balvin - Anaranjado'
                width='560'
                height='315'
                src='https://www.youtube-nocookie.com/embed/WcF8A9s3ldA?controls=0'
                frameBorder='0'
                allowFullScreen
              />
              {_.map(Array(5), (circle, i) => {
                return (
                  <div
                    key={i}
                    className={`bg-orange-500 hidden md:block w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-orange-500 bg-opacity-25 rounded-full circle-0${i}`}
                  />
                )
              })}
            </div>
          </div>
          <div className='mb-12 lg:pr-96 lg:pl-10'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                title='Jowell y Randy - Perriando'
                width='560'
                height='315'
                src='https://www.youtube-nocookie.com/embed/81GgDM-MdBA?controls=0'
                frameBorder='0'
                allowFullScreen
              />
            </div>
          </div>
          <div className='lg:pr-32 lg:pl-96'>
            <div className='aspect-w-16 aspect-h-9'>
              <iframe
                title='Jowell y Randy, Kiko El Crazy - Se Acabó La Cuarentena'
                width='560'
                height='315'
                src='https://www.youtube-nocookie.com/embed/EwLYDWew1rk?controls=0'
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
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {_.map(instagramPosts, ({ url, src, title }, i) => {
            return (
              <SwiperSlide className='p-4' key={i}>
                <a
                  className='block overflow-hidden rounded-sm max-w-[100%] aspect-w-1 aspect-h-1'
                  href={`https://www.instagram.com/p/${url}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Image
                    src={src}
                    alt='Instagram image from @mydoxis'
                    objectFit='cover'
                    layout='fill'
                  />
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const client = Client.buildClient({
    domain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
    storefrontAccessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  })

  const products = await client.product.fetchAll(50)

  let posts = [
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
