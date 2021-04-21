import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Cart({ helpers, menu }) {
  const { locale } = useRouter()
  const count = helpers.cartCount()

  return (
    count > 0 && (
      <div className='z-50 lg:fixed lg:top-4 lg:right-4'>
        <Link href='/cart'>
          <a
            className={`flex items-center text-xl font-bold ${
              menu ? 'text-gray-800' : 'text-white'
            } lg:text-gray-300 lg:bg-gray-900 rounded-sm lg:rounded-md lg:p-2.5 lg:text-base`}
          >
            <svg
              className='block w-8 h-8 mr-1 fill-current lg:w-6 lg:h-6'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M6.665 9.068l-3.665-1.66v14l3.665 2.592 14.335-2.155v-14.845l-14.335 2.068zm-1.665 1.441l1 .453v10.118l-1-.707v-9.864zm14 9.615l-11 1.653v-10.881l11-1.587v10.815zm-2-15.833l-.001 1.749c0 .246-.18.455-.423.492-.303.045-.576-.19-.576-.495v-1.746c.001-.691-.231-1.304-.653-1.726-.368-.37-.847-.565-1.384-.565-1.547 0-2.96 1.558-2.963 3.268v1.681c0 .247-.181.457-.425.494-.302.046-.575-.189-.575-.494l.001-1.683c.004-2.261 1.866-4.266 3.962-4.266 1.717 0 3.039 1.387 3.037 3.291zm-9.999 2.209v-2.235c.004-2.26 1.866-4.265 3.962-4.265.492 0 .944.125 1.35.332-.423.17-.822.4-1.188.683l-.162-.015c-1.547 0-2.961 1.558-2.963 3.268v2.232c0 .248-.182.458-.427.494-.3.045-.572-.187-.572-.494z' />
            </svg>
            {count}
            <span className='hidden ml-1 lg:inline-block'>
              {locale === 'en'
                ? count > 1
                  ? 'items'
                  : 'item'
                : count > 1
                ? 'productos'
                : 'producto'}
            </span>
          </a>
        </Link>
        <div
          className={
            'bg-orange-500 hidden lg:block w-72 h-72 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-orange-500 bg-opacity-25 rounded-full mini-circle-00'
          }
          style={{ zIndex: '-1', pointerEvents: 'none' }}
        />
        <div
          className={
            'bg-orange-500 hidden lg:block w-72 h-72 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-orange-500 bg-opacity-25 rounded-full mini-circle-01'
          }
          style={{ zIndex: '-1', pointerEvents: 'none' }}
        />
      </div>
    )
  )
}
