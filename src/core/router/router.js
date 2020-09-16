export default function Router (routes) {
  try {
    if (!routes) {
      throw 'No routes param received'
    }
    this.constructor(routes)
    this.init()
  } catch (error) {
    console.log(error)
  }
}

Router.prototype = {
  routes: undefined,
  constructor (routes) {
    this.routes = routes
  },
  init () {
    (function (scope, r) {
      window.addEventListener('hashchange', (e) => {
        scope.routeChanged(scope, r)
      })
    })(this, this.routes)
    this.routeChanged(this, this.routes)
  },
  routeChanged (scope, routes) {
    if (window.location.hash.length > 0) {
      routes.map((route) => {
        if (route.isActualRoute(window.location.hash.substr(1))) {
          scope.showSelectedSection(route.name)
        }
      })
    } else {
      routes.map((route) => {
        if (route.defaultRoute) {
          scope.showSelectedSection(route.name)
        }
      })
    }
  },
  showSelectedSection (sectionName) {
    let sections = document.getElementsByTagName('section')

    if (!sections.length) return null

    for (const index in sections) {
      const item = sections.item(index)
      const node = document.getElementById(item.id)

      if (item.id === sectionName) {
        node.setAttribute('class', 'section section--active')
      } else {
        node.setAttribute('class', 'section')
      }
    }
  }
}
