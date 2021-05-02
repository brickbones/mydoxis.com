import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from '../components/layout'

export default function AboutUs({ helpers }) {
  const { locale } = useRouter()

  return (
    <Layout helpers={helpers}>
      <section className='pb-32 text-right bg-gradient-to-r from-gray-200 to-gray-300'>
        <h1 className='px-10 py-4 mb-10 text-3xl text-center text-orange-900 uppercase bg-orange-500 md:text-4xl md:inline-block md:my-20 font-display'>
          {locale === 'en' ? 'What is DOXIS?' : '¿Qué es DOXIS?'}
        </h1>
        <div className='container px-6 pb-10 mx-auto text-left md:px-20'>
          <p className='mb-10 text-gray-900 max-w-prose text-xl md:text-2xl'>
            {locale === 'en'
              ? 'DOXIS is an eco-friendly lifestyle brand that welcomes music, art, life and all the good things that comes with it.'
              : 'DOXIS es una marca con estilo de vida; respetuosa del medio ambiente que acoge a la música, el arte, la vida y las buenas cosas que hay en ella.'}
          </p>
          <p className='mb-10 text-gray-900 max-w-prose text-xl'>
            {locale === 'en'
              ? 'DOXIS name is a wordplay that has Spanish references, since GOD in Spanish translates DIOS and the X in the middle means mystery-higher power then DOXIS stands for God-music-art-life. DOXIS logo is a test tube with the "eye of God" in it. It reminds us to never give up in our dreams, also represents our willingness to experiment new techniques to reach our goals.'
              : 'El nombre de DOXIS es un juego de palabras en español donde DIOS mas la letra X conforman la palabra DOXIS así que DOXIS significa: Dios-música-arte-vida. El logo de DOXIS es un tubo de ensayo con el "ojo de Dios" para recordarnos de nunca renunciar a nuestros sueños, también representa probar nuevas técnicas para lograr nuestras metas.'}
          </p>
          {/* <p className='mb-20 text-gray-900 max-w-prose text-lg'>
            {locale === 'en'
              ? 'DOXIS was born in 2012 somewhere in Puerto Rico USA and somewhere in Medellin Colombia when Jowell & Randy, the Puerto Rican duo that changed everything for good in the reggaeton music, joined fashion designers stylists and entrepreneurs Michael Clements & Paula Sanchez, both have worked previously for the first successful reggaeton clothing brand AKOLATRONIC and also had work with DJ NELSON in another project: called "Angels" for WISIN y Yandel.'
              : 'DOXIS en el año 2012 en algún lugar de Puerto Rico USA y en algún lugar de Medellín Colombia cuando Jowell & Randy, el dúo puertorriqueño, se unen a Michael Clements & Paula Sánchez diseñadores, estilistas y empresarios que ya habían trabajado en la primera marca exitosa de reggaetón: AKOLATRONIC y también habían trabajado con DJ Nelson en otro proyecto de marca llamado "Angels" para WISIN y Yandel.'}
          </p> */}
          <div className='mb-20 md:flex md:justify-between max-w-prose'>
            <div className='flex-1 mb-10 text-lg'>
              <h4 className='mb-5 text-lg font-semibold'>
                {locale === 'en' ? 'Products' : 'Productos'}
              </h4>
              <p>
                LEYVAN @26leyvan_aa
                <br />
                JUANFRAN @juanfran.oficial
                <br />
                VICTOR PEREZ @victorperez
                <br />
                DOXIS @mydoxis
              </p>
            </div>
            <div className='flex-1 mb-10 text-lg'>
              <h4 className='mb-5 text-lg font-semibold'>
                {locale === 'en' ? 'Address' : 'Dirección'}
              </h4>
              <p>
                913 Jefferson Blvd,
                <br />
                Orlando FL 32822
                <br />
                USA
              </p>
            </div>
          </div>

          <div className='lg:ml-72'>
            <Image
              src='https://source.unsplash.com/1000x600'
              width='1000'
              height='600'
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
