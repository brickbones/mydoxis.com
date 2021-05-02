import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Footer() {
  const { locale } = useRouter()

  return (
    <footer className='py-20 text-gray-300 bg-gray-500 md:py-20'>
      <div className='container px-4 mx-auto text-2xl leading-relaxed md:px-20 md:flex md:justify-between flex-wrap'>
        <div className='mb-2 md:w-1/2 lg:w-auto p-5'>
          <h4 className='py-1 mb-5 text-xl tracking-wider text-white uppercase border-b-2 border-orange-500 font-display'>
            {locale === 'en' ? 'About Us' : 'Acerca de'}
          </h4>
          <p>
            <Link href='/about-us' locale={locale}>
              <a>
                {locale === 'en' ? 'Get to know us' : 'Conócenos mejor'} &#8599;
              </a>
            </Link>
          </p>
        </div>
        <div className='mb-2 md:w-1/2 lg:w-auto p-5'>
          <h4 className='py-1 mb-5 text-xl tracking-wider text-white uppercase border-b-2 border-orange-500 font-display'>
            {locale === 'en' ? 'Contact' : 'Contacto'}
          </h4>
          <p>
            <a href='tel:+13212992083'>(+1) 321 299 2083</a>
          </p>
        </div>
        <div className='mb-2 md:w-1/2 lg:w-auto p-5'>
          <h4 className='py-1 mb-5 text-xl tracking-wider text-white uppercase border-b-2 border-orange-500 font-display'>
            {locale === 'en' ? 'Address' : 'Dirección'}
          </h4>
          <p>
            913 Jefferson Blvd
            <br />
            Orlando FL 32822
            <br />
            USA
          </p>
        </div>
        <div className='mb-2 md:w-1/2 lg:w-auto p-5'>
          <h4 className='py-1 mb-5 text-xl tracking-wider text-white uppercase border-b-2 border-orange-500 font-display'>
            {locale === 'en' ? 'Social Media' : 'Redes Sociales'}
          </h4>
          <p>
            <a
              className='flex items-center'
              href='https://www.instagram.com/mydoxis/'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                className='mr-3 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
              </svg>
              Instagram
            </a>
            <a
              className='flex items-center'
              href='https://www.facebook.com/mydoxis'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                className='mr-3 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z' />
              </svg>
              Facebook
            </a>
            <a
              className='flex items-center'
              href='https://www.tiktok.com/@mydoxis'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                className='mr-3 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 32 32'
              >
                <title>tiktok</title>
                <path d='M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z' />
              </svg>
              TikTok
            </a>
            <a
              className='flex items-center'
              href='https://www.youtube.com/channel/UC8bNl1aauU6J9OZgqaUMqbw'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                className='mr-3 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
              </svg>
              YouTube
            </a>
            <a
              className='flex items-center'
              href='https://open.spotify.com/artist/4IMAo2UQchVFyPH24PAjUs'
              target='_blank'
              rel='noreferrer'
            >
              <svg
                width='24'
                height='24'
                className='mr-3 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                fillRule='evenodd'
                clipRule='evenodd'
              >
                <path d='M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z' />
              </svg>
              Spotify
            </a>
          </p>
        </div>
      </div>

      <div className='flex flex-col px-6 text-base md:text-center md:items-center'>
        <Link href='/' locale={locale}>
          <a>
            <img
              className='h-20 my-5 chubu'
              src='/svg/chubu-full.svg'
              alt='Chubu DOXIS'
            />
          </a>
        </Link>
        <p>
          DOXIS &copy; {new Date().getFullYear()}.{' '}
          {locale === 'en'
            ? 'All rights reserved.'
            : 'Todos los derechos reservados.'}
        </p>
      </div>

      <a
        href={`https://api.whatsapp.com/send?phone=13212992083&text=${
          locale === 'en'
            ? 'Hi%20DOXIS.%20I%20would%20like%20to%20know%3A%20'
            : 'Hola%20DOXIS.%20Me%20gustar%C3%ADa%20saber%3A%20'
        }`}
        target='_blank'
        rel='noreferrer'
      >
        <div className='fixed z-50 flex items-center px-4 py-1.5 font-semibold text-gray-300 bg-gray-900 rounded right-4 bottom-4'>
          <img
            className='h-5 mr-2'
            src='/svg/whatsapp-logo.svg'
            alt='Logo WhatsApp'
          />
          <span className='hidden mr-1 md:inline'>
            {locale === 'en' ? 'Questions?' : '¿Preguntas?'}
          </span>{' '}
          {locale === 'en' ? "Let's chat" : 'Escríbenos'}
        </div>
      </a>
    </footer>
  )
}
