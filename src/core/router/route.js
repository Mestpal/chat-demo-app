 'use strict'

 export default function Route(name, defaultRoute) {
    try {
      if (!name) {
        throw ('Mandatory params for Route are missing')
      }
      this.constructor (name, defaultRoute)
    } catch (error) {
      console.log(error)
    }
 }

 Route.prototype = {
  name: undefined,
  defaultRoute: undefined,
  constructor (name, defaultRoute) {
    this.name = name
    this.defaultRoute = defaultRoute
  },
  isActualRoute (location) {
      return location.replace('#', '') === this.name
   }
 }
