import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import Image from 'next/image'

export default function Cart({ helpers, checkout }) {
  const { locale } = useRouter()
  const count = helpers.cartCount()

  function handleClick(e) {
    helpers.removeProductFromCart(e.target.parentElement.dataset.id)
  }

  function handleCheckout(e) {
    window.open(checkout.webUrl, '_self')
  }

  useEffect(() => {}, [])

  return (
    <Layout helpers={helpers}>
      <section className='pb-32 bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-4xl text-center text-orange-900 uppercase bg-orange-500 md:text-left md:mb-20 font-display'>
          {locale === 'en' ? 'Cart' : 'Carrito'}
        </h1>
        <div className='container px-6 pb-10 mx-auto md:px-20'>
          {count > 0 ? (
            <>
              <ul className='mb-20 text-base md:text-xl'>
                {_.map(checkout.lineItems, (item) => {
                  return (
                    <li
                      key={item.id}
                      className='flex items-center justify-between py-2 border-b border-gray-400 md:py-0 even:bg-gray-300'
                    >
                      <div className='hidden md:block'>
                        <div className='w-20 h-20 p-2'>
                          <Image
                            className='object-cover'
                            src={item.variant.image.src}
                            alt={item.title}
                            width='256'
                            height='256'
                            quality='35'
                          />
                        </div>
                      </div>
                      <p className='flex-1 px-2'>
                        {item.title}
                        <span className='ml-2 text-gray-500 md:ml-5'>{`x ${item.quantity}`}</span>
                      </p>
                      <span className='px-2 text-xs font-bold tracking-wider text-gray-500 uppercase md:px-10'>
                        {_.map(
                          item.variant.selectedOptions,
                          (option) => `${option.name}: ${option.value}`
                        ).join(' · ')}
                      </span>
                      <button
                        className='px-2 py-1 text-xs font-bold tracking-wider text-gray-200 uppercase bg-gray-400 rounded whitespace-nowrap'
                        data-id={item.id}
                        onClick={handleClick}
                      >
                        <span className='hidden md:inline'>
                          {locale === 'en' ? 'Remove' : 'Remover'}
                        </span>
                        <span className='md:hidden'>X</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className='items-center text-center sm:text-right md:flex'>
                <div className='flex-1 mb-5 text-xl text-gray-600 md:px-10 md:mb-0'>
                  {locale === 'en' ? 'Summary:' : 'Resumen:'}{' '}
                  {locale === 'en'
                    ? count > 1
                      ? `${count} items`
                      : `${count} item`
                    : count > 1
                    ? `${count} productos`
                    : `${count} producto`}{' '}
                  &middot; <br className='sm:hidden' />
                  <span className='font-bold'>
                    {locale === 'en' ? 'Total:' : 'Valor total:'}{' '}
                    {checkout.totalPriceV2.currencyCode}{' '}
                    {checkout.totalPriceV2.amount}
                  </span>
                </div>
                <button
                  className='px-4 py-1.5 bg-gray-500 rounded whitespace-nowrap text-gray-50 font-bold disabled:bg-gray-400 disabled:text-gray-300'
                  onClick={handleCheckout}
                >
                  {locale === 'en'
                    ? 'Continue to checkout'
                    : 'Continuar con el pago'}{' '}
                  &#8599;
                </button>
              </div>
            </>
          ) : (
            <p className='mb-10 text-lg'>
              {locale === 'en'
                ? 'Nothing in the cart yet. Keep shopping!'
                : 'Nada en el carrito todavía. ¡Continua comprando!'}
            </p>
          )}
        </div>
      </section>
    </Layout>
  )
}
