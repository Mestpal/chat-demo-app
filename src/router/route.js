 'use strict'

 export default function Route(name, htmlName, defaultRoute) {
    try {
      if (!name || !htmlName) {
        throw ('Mandatory params for Route are missing')
      }
      this.constructor (name, htmlName, defaultRoute)
    } catch (error) {
      console.log(error)
    }
 }

 Route.prototype = {
  name: undefined,
  htmlName: undefined,
  defaultRoute: undefined,
  constructor (name, htmlName, defaultRoute) {
    this.name = name
    this.htmlName = htmlName
    this.defaultRoute = defaultRoute
  },
  isActualRoute (location) {
      return location.replace('#', '') === this.name
   }
 }
