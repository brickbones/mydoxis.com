module.exports = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['source.unsplash.com', 'cdn.shopify.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://mydoxis-com.myshopify.com/admin',
        permanent: true,
      },
    ]
  },
}
