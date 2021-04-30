import { useRouter } from 'next/router'
import Layout from '../components/layout'

export default function AboutUs({ helpers }) {
  const { locale } = useRouter()

  return (
    <Layout helpers={helpers}>
      <section className='pb-32 bg-gradient-to-r from-gray-200 to-gray-300 h-screen'>
        <h1 className='px-10 py-4 mb-10 text-3xl md:text-4xl text-orange-900 uppercase bg-orange-500 md:mb-20 font-display'>
          {locale === 'en' ? 'College Jackets' : 'Chaquetas'}
        </h1>
        <div className='container px-6 pb-10 mx-auto md:px-20'>
          <h1 className='py-48 text-xl text-center'>
            <div class='lds-spinner'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </h1>
        </div>
      </section>
    </Layout>
  )
}
