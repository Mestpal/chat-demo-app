export default function listenersModule() {
  (() => {
    console.log('pepe')
    document.addEventListener('click', clickAddFriend)

    if (localStorage.getItem('friendStatus')) {
      let buttons = document.getElementsByName('addAsFriend')
      for (const index in buttons) {
        updateProfile(JSON.parse(localStorage.getItem('friendStatus')), buttons.item(index))
      }
    }
  })()
}

function clickAddFriend (event) {
  let target = event.target
  if (target.classList.contains('btn') && target.innerText === "ADD AS FRIEND") {
    if(localStorage.getItem('friendStatus') === 'true') {
      localStorage.setItem('friendStatus', 'false')
    } else {
      localStorage.setItem('friendStatus', 'true')
    }
    updateProfile(JSON.parse(localStorage.getItem('friendStatus')), target)
  }
}

function updateProfile (friendStatus, target = null) {
  const profilePage = document.getElementsByClassName('page__profile')[0]

  if (JSON.parse(friendStatus) ) {
    profilePage.setAttribute('class', 'page__profile page__profile--alt')
    target ? target.setAttribute('class', 'btn btn--alt') : ''
  } else {
    profilePage.setAttribute('class', 'page__profile')
    target ? target.setAttribute('class', 'btn') : ''
  }
}
