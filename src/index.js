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

  document.addEventListener('click', clickAddFriend)
  function clickAddFriend (event) {
    let element = event.target
      if (element.classList.contains('btn') && element.innerText === "ADD AS FRIEND") {
        console.log('clickAddFriend')
      }
  }
}())
