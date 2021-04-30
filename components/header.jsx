import { useState } from 'react'
import { useRouter } from 'next/router'
import { map } from 'lodash'
import Link from 'next/link'
import Cart from './cart'

function HeaderLink({ href, name, locale, children }) {
  return (
    <li className='relative block px-8 py-5 text-xs font-bold tracking-widest text-gray-900 uppercase whitespace-nowrap'>
      {href ? (
        <Link href={href} locale={locale}>
          <a>{locale === 'en' ? name.en : name.es}</a>
        </Link>
      ) : locale === 'en' ? (
        name.en
      ) : (
        name.es
      )}
      {children}
    </li>
  )
}

function Submenu({ links, locale, children }) {
  return (
    <ul className='absolute z-50 flex-col text-base text-center text-white transform bg-gray-900 rounded-md submenu bottom-1/2 right-full md:transform md:rotate-180 md:translate-y-1/2'>
      {map(links, (link, key) => {
        return link.external ? (
          <li
            className='block px-10 py-3 whitespace-nowrap md:hover:bg-white md:hover:bg-opacity-10'
            key={key}
          >
            <a href={link.href} target='_blank' rel='noreferrer'>
              {link.name}
            </a>
          </li>
        ) : (
          <li
            className='block px-10 py-3 whitespace-nowrap md:hover:bg-white md:hover:bg-opacity-10'
            key={key}
          >
            <Link href={link.href} locale={locale}>
              {link.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function Header({ helpers, checkout }) {
  const { asPath, locale } = useRouter()
  const [menu, setMenu] = useState(false)

  return (
    <header className='lg:w-20 lg:h-screen'>
      <div className='fixed left-0 right-0 z-50 flex items-center justify-between w-screen px-5 py-3 bg-gradient-to-b from-[#F6581E88] to-[#F6581E00] lg:from-gray-400 lg:to-gray-200 lg:flex-col lg:h-screen lg:z-50 lg:bg-gradient-to-b lg:w-20 lg:px-0 lg:py-5'>
        <Link href='/' locale={locale}>
          <a className='flex-1 py-3 lg:flex-none lg:py-0'>
            <img
              className='h-16 chubu lg:h-20'
              src={'/svg/chubu-full.svg'}
              alt='Chubu DOXIS'
            />
          </a>
        </Link>
        <ul
          className='hidden p-0 m-0 list-none lg:flex lg:transform lg:rotate-180'
          style={{ writingMode: 'vertical-rl' }}
        >
          <HeaderLink
            href='/'
            name={{ en: 'Home', es: 'Inicio' }}
            locale={locale}
          />
          <HeaderLink
            href=''
            name={{ en: 'Follow Us', es: 'Síguenos' }}
            locale={locale}
          >
            <Submenu
              locale={locale}
              links={[
                {
                  href: 'https://www.instagram.com/mydoxis/',
                  name: 'Instagram',
                  external: true,
                },
                {
                  href: 'https://www.facebook.com/mydoxis',
                  name: 'Facebook',
                  external: true,
                },
                {
                  href: 'https://www.tiktok.com/@mydoxis',
                  name: 'TikTok',
                  external: true,
                },
                {
                  href:
                    'https://www.youtube.com/channel/UC8bNl1aauU6J9OZgqaUMqbw',
                  name: 'YouTube',
                  external: true,
                },
                {
                  href:
                    'https://open.spotify.com/artist/4IMAo2UQchVFyPH24PAjUs',
                  name: 'Spotify',
                  external: true,
                },
              ]}
            />
          </HeaderLink>
          {/* <HeaderLink
            href='/college-jackets'
            name={{ en: 'Jackets', es: 'Chaquetas' }}
            locale={locale}
          /> */}
          <HeaderLink
            href='/about-us'
            name={{ en: 'About Us', es: 'Acerca de' }}
            locale={locale}
          />
          <HeaderLink
            href=''
            name={{ en: 'Collections', es: 'Colecciones' }}
            locale={locale}
          >
            <Submenu
              locale={locale}
              links={[
                { href: '/collection/doxis', name: 'DOXIS' },
                { href: '/collection/juanfran', name: 'Juanfran' },
                { href: '/collection/leyvan', name: 'Leyvan' },
                { href: '/collection/victor-perez', name: 'Victor Perez' },
              ]}
            />
          </HeaderLink>
        </ul>
        <Cart helpers={helpers} checkout={checkout} menu={menu} />
        <button
          className={`block ml-4 ${
            menu ? 'text-gray-800' : 'text-white'
          } lg:ml-8 focus:outline-none lg:hidden`}
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <svg
              className='block fill-current w-7 h-7'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
            </svg>
          ) : (
            <svg
              className='block fill-current w-7 h-7'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
            </svg>
          )}
        </button>
        <div
          className={`${
            menu ? 'fixed' : 'hidden'
          } text-3xl bottom-5 left-5 md:text-xl lg:block`}
        >
          <Link href={asPath} locale='en'>
            <a onClick={() => setMenu(false)}>
              <span role='img' aria-label='English'>
                &#127482;&#127480;
              </span>
            </a>
          </Link>
          <br />
          <Link href={asPath} locale='es'>
            <a onClick={() => setMenu(false)}>
              <span role='img' aria-label='Español'>
                &#127466;&#127480;
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div
        className={`fixed z-10 w-screen h-screen bg-gradient-to-r from-gray-400 to-gray-300 items-center justify-center text-3xl sm:text-2xl md:text-3xl leading-relaxed font-bold ${
          menu ? 'flex' : 'hidden'
        }`}
      >
        <ul className='flex flex-col sm:flex-row sm:gap-8 md:flex-col'>
          <li>
            <Link href='/' locale={locale}>
              <a onClick={() => setMenu(false)}>
                <span className='border-b-4 border-orange'>
                  {locale === 'en' ? 'Home' : 'Inicio'}
                </span>
              </a>
            </Link>
          </li>
          <li>
            <span className='border-b-4 border-orange'>
              {locale === 'en' ? 'Collections' : 'Colecciones'}
            </span>
            <ul className='my-5 text-2xl font-normal sm:text-xl md:text-2xl'>
              <li>
                <Link href='/collection/doxis' locale={locale}>
                  <a onClick={() => setMenu(false)}>DOXIS</a>
                </Link>
              </li>
              <li>
                <Link href='/collection/juanfran' locale={locale}>
                  <a onClick={() => setMenu(false)}>Juanfran</a>
                </Link>
              </li>
              <li>
                <Link href='/collection/leyvan' locale={locale}>
                  <a onClick={() => setMenu(false)}>Leyvan</a>
                </Link>
              </li>
              <li>
                <Link href='/collection/victor-perez' locale={locale}>
                  <a onClick={() => setMenu(false)}>Victor Perez</a>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href='/college-jackets' locale={locale}>
              <a onClick={() => setMenu(false)}>
                <span className='border-b-4 border-orange'>
                  {locale === 'en' ? 'Jackets' : 'Chaquetas'}
                </span>
              </a>
            </Link>
          </li>
          <li>
            <span className='border-b-4 border-orange'>
              {locale === 'en' ? 'Follow Us' : 'Síguenos'}
            </span>
            <ul className='my-5 text-2xl font-normal sm:text-xl md:text-2xl'>
              <li>
                <a
                  href='https://www.instagram.com/mydoxis/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com/mydoxis'
                  target='_blank'
                  rel='noreferrer'
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href='https://www.tiktok.com/@mydoxis'
                  target='_blank'
                  rel='noreferrer'
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href='https://www.youtube.com/channel/UC8bNl1aauU6J9OZgqaUMqbw'
                  target='_blank'
                  rel='noreferrer'
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href='https://open.spotify.com/artist/4IMAo2UQchVFyPH24PAjUs'
                  target='_blank'
                  rel='noreferrer'
                >
                  Spotify
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}
