'use strict'
import '../assests/styles/main.scss'

import * as routing from './router'

(function (){
  function init () {
    var router = new routing.Router([
      new routing.Route('profile', 'profile.html', true),
      new routing.Route('chat', 'chat.html')
    ])
  }
  init()
}())
