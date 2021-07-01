import locales from 'locales.json'

class Translate {
  constructor(locale) {
    this.locale = locale
    this.t = this.translate.bind(this)
  }

  resolve(path, obj) {
    return path.split('.').reduce((p, c) => p?.[c], obj)
  }

  translate(id, params = {}) {
    if (!params) return this.resolve(id, locales)[this.locale]
    return this.resolve(id, locales)[this.locale].replace(
      /{(\w+)}/g,
      (placeholder, variable) => params[variable] || placeholder
    )
  }
}

export default function useTranslate(locale) {
  return new Translate(locale)
}
