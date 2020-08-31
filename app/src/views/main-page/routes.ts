const routes: RouteConfig[] = [
  {
    key: 'MainPage',
    path: '/main-page',
    createConfig: {
      single: false,
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
