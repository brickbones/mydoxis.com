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
    <header className='md:w-20 md:h-screen'>
      <div className='fixed left-0 right-0 z-50 flex items-center justify-between w-screen px-5 py-3 bg-gradient-to-b from-[#F6581E88] to-[#F6581E00] md:from-gray-400 md:to-gray-200 md:flex-col md:h-screen md:z-50 md:bg-gradient-to-b md:w-20 md:px-0 md:py-5'>
        <Link
          className='flex-1 py-3 md:flex-none md:py-0'
          href='/'
          locale={locale}
        >
          <a className='flex-1'>
            <img
              className='h-16 chubu md:h-20'
              src={'/svg/chubu-full.svg'}
              alt='Chubu DOXIS'
            />
          </a>
        </Link>
        <ul
          className='hidden p-0 m-0 list-none md:flex md:transform md:rotate-180'
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
          <HeaderLink
            href='/college-jackets'
            name={{ en: 'Jackets', es: 'Chaquetas' }}
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
        <Cart helpers={helpers} checkout={checkout} />
        <button className='block ml-4 text-white md:ml-8 focus:outline-none md:hidden'>
          <svg
            className='block fill-current w-7 h-7'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
          </svg>
        </button>
        <div className='hidden text-xl md:block'>
          <Link href={asPath} locale='en'>
            <a>
              <span role='img' aria-label='English'>
                &#127482;&#127480;
              </span>
            </a>
          </Link>
          <br />
          <Link href={asPath} locale='es'>
            <a>
              <span role='img' aria-label='Español'>
                &#127466;&#127480;
              </span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}
