export default function listeners() {
  (() => {
    document.getElementsByName('addAsFriend').forEach((element) => {
      element.onclick = clickAddFriend
    })

    if (localStorage.getItem('friendStatus')) {
      let buttons = document.getElementsByName('addAsFriend')
      for (const index in buttons) {
        updateProfile(JSON.parse(localStorage.getItem('friendStatus')), buttons.item(index))
      }
    }
  })()
}

let clickAddFriend = function (event) {
  if(localStorage.getItem('friendStatus') === 'true') {
    localStorage.setItem('friendStatus', 'false')
  } else {
    localStorage.setItem('friendStatus', 'true')
  }
  updateProfile(JSON.parse(localStorage.getItem('friendStatus')), event.target)
}

let updateProfile = function (friendStatus, target = null) {
  const profilePage = document.getElementsByClassName('page__profile').item(0)

  if (JSON.parse(friendStatus) ) {
    profilePage.setAttribute('class', 'page__profile page__profile--alt')
    target ? target.setAttribute('class', 'btn btn--alt') : ''
  } else {
    profilePage.setAttribute('class', 'page__profile')
    target ? target.setAttribute('class', 'btn') : ''
  }
}

export { listeners, clickAddFriend, updateProfile }
