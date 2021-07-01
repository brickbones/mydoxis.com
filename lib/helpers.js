import insane from 'insane'
import marked from 'marked'

export function i(html) {
  return insane(html, {
    allowedTags: [
      'h1',
      'h2',
      'a',
      'p',
      'div',
      'span',
      'strong',
      'em',
      'b',
      'i',
      'del',
      'br',
      'ul',
      'li',
    ],
  })
}

export function m(markdown) {
  return i(marked(markdown))
}

export function p(amount, currency, locale) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
