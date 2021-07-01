import { useRouter } from 'next/router'
import Image from 'next/image'
import { datocms } from '../lib/datocms'
import { m } from '../lib/helpers'

import Layout from '../components/layout'

export default function AboutUs({ helpers, datocmsData }) {
  const { locale } = useRouter()

  const { video, featuredImage, title, description, products, address } =
    datocmsData.about

  return (
    <Layout helpers={helpers}>
      <section className='pb-32 text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-3xl text-center text-orange-900 uppercase bg-orange-500 md:text-4xl md:inline-block md:my-20 font-display'>
          {title}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <div
            className='mb-10 text-gray-900 max-w-prose text-xl markdown'
            dangerouslySetInnerHTML={{ __html: m(description) }}
          />
          <div className='mb-20 md:flex md:justify-between max-w-prose'>
            <div className='flex-1 mb-10 text-lg'>
              <h4 className='mb-5 text-lg font-semibold'>
                {locale === 'en' ? 'Products' : 'Productos'}
              </h4>
              <div
                className='markdown'
                dangerouslySetInnerHTML={{ __html: m(products) }}
              />
            </div>
            <div className='flex-1 mb-10 text-lg'>
              <h4 className='mb-5 text-lg font-semibold'>
                {locale === 'en' ? 'Address' : 'Dirección'}
              </h4>
              <div
                className='markdown'
                dangerouslySetInnerHTML={{ __html: m(address) }}
              />
            </div>
          </div>

          <div
            className='lg:ml-72 bg-cover'
            style={{ backgroundImage: `url(${featuredImage.blurUpThumb})` }}
          >
            <Image
              src={featuredImage.url}
              layout='responsive'
              width={featuredImage.width}
              height={featuredImage.height}
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const datocmsData = await datocms({
    query: `query About($locale: SiteLocale) {
      about(locale: $locale) {
        featuredImage {
          url
          blurUpThumb
          alt
          width
          height
        }
        title
        description
        products
        address
      }
    }`,
    variables: { locale: context.locale },
  })

  return {
    props: { datocmsData },
  }
}
