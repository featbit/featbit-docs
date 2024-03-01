const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

module.exports = withNextra({
  basePath: '/docs',
  // rewrites: async () =>{
  //   return [
  //     {
  //       source: '/',
  //       destination: '/docs',
  //     },
  //     {
  //       source: '/:path*',
  //       destination: '/docs/:path*',
  //     },
  //   ]
  // },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/docs',
      //   basePath: false,
      //   permanent: false
      // },
      // {
      //   source: '/:path*',
      //   destination: '/docs/:path*',
      //   basePath: false,
      //   permanent: true
      // },
    ]
  }
});
