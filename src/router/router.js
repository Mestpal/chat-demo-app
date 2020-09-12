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
  root: undefined,
  constructor (routes) {
    this.routes = routes
    this.root = document.getElementById('app')
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
          scope.goToNewRoute(route.htmlName)
        }
      })
    } else {
      routes.map((route) => {
        if (route.default) {
          scope.goToNewRoute(route.htmlName)
        }
      })
    }
  },
  goToNewRoute (htmlName) {
    (function (scope) {
      const url = `views/${htmlName}`
      const request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          scope.root.innerHTML = this.responseText
        }
      }
      request.open('GET', url, true)
      request.send()
    })(this)
  }
}
