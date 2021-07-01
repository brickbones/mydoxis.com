module.exports = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['www.datocms-assets.com', 'cdn.shopify.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'https://mydoxis-com.myshopify.com/admin',
        permanent: true,
      },
      {
        source: '/admin-cms',
        destination: 'https://mydoxis.admin.datocms.com',
        permanent: true
      }
    ]
  },
}
