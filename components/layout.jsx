import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './header'
import Footer from './footer'

export default function Layout({ children, helpers, checkout }) {
  const { locale, route } = useRouter()

  const title =
    locale === 'en' ? 'DOXIS | High Streetwear' : 'DOXIS | Moda Urbana'
  const description =
    locale === 'en'
      ? 'DOXIS is an eco-friendly lifestyle brand that welcomes music, art, life and all the good things that comes with it.'
      : 'DOXIS es una marca de estilo de vida ecológica que da la bienvenida a la música, el arte, la vida y todas las cosas buenas que la acompañan.'
  const url = 'https://mydoxis.com'
  const urlLocale =
    locale === 'en' ? 'https://mydoxis.com' : 'https://mydoxis.com/es'
  const keywords =
    locale === 'en'
      ? 'fashion, urban, streetwear, apparel, clothing, reggaeton, jowell, randy'
      : 'moda, urbano, ropa de calle, indumentaria, ropa, reggaeton, jowell, randy'

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <title>{title}</title>
        <meta name='theme-color' content='#f6581e' />
        <meta name='description' content={description} />
        <link rel='icon' type='image/png' href='/favicon.png' />
        <meta name='keywords' content={keywords} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={`${url}/thumbnail.jpg`} />
        <meta property='og:url' content={urlLocale} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:site_name' content={title} />
        <meta name='robots' content='index,follow' />
        <meta
          name='author'
          content='Hombre Lobo Studio · https://hombrelobo.co'
        />
        <link
          rel='alternate'
          hrefLang='es'
          href={`${url}/es${route === '/' ? '' : route}`}
        />
        <link
          rel='alternate'
          hrefLang='en'
          href={`${url}${route === '/' ? '' : route}`}
        />
      </Head>
      <div className='page-content md:flex'>
        <Header helpers={helpers} checkout={checkout} />
        <main className='min-w-0 md:flex-1'>
          {children}
          <Footer />
        </main>
      </div>
    </>
  )
}
