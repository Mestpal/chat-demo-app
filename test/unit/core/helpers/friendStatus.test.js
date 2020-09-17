import jsdom from 'jsdom'
import * as friendStatus from '../../../../src/helpers/friendStatus'

const {JSDOM} = jsdom
const addFriendButtonMock = `<button type="button" name="addAsFriend" class="btn"> ADD AS FRIEND </button>`
const pageProfileMock = `<div class="page__profile"></div>`

beforeEach(() => {
  const documentHTML = `<!doctype html><html><body></body></html>`
  const {document} = (new JSDOM(documentHTML)).window
  global.document = document
  global.window = document.defaultView
})

describe('friendStatus helper', () => {
  test('if listeners method adds the onclick event', () => {
    window.document.body.innerHTML = addFriendButtonMock
    const friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)

    friendStatusButton.addEventListener = jest.fn()

    friendStatus.listeners()

    expect(friendStatusButton.addEventListener.mock.calls[0][0]).toBe('click')
  })

  test('if page profile is updated to active', () => {
    window.document.body.innerHTML = `${addFriendButtonMock}${pageProfileMock}`
    let profilePage = window.document.getElementsByClassName('page__profile').item(0)
    let friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)

    console.log(friendStatus.updateProfile)
    friendStatus.updateProfile(true, {
      profilePage: profilePage,
      friendButton: friendStatusButton
    })

    profilePage = window.document.getElementsByClassName('page__profile').item(0)
    friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)

    expect(profilePage.classList).toMatchObject({0: 'page__profile', 1: 'page__profile--alt'})
    expect(friendStatusButton.classList).toMatchObject({0: 'btn', 1: 'btn--alt'})
  })

  test('if page profile is updated to default', () => {
    window.document.body.innerHTML = `${addFriendButtonMock}${pageProfileMock}`
    let profilePage = window.document.getElementsByClassName('page__profile').item(0)
    let friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)
    profilePage.setAttribute('class', 'page__profile page__profile--alt')
    friendStatusButton.setAttribute('class', 'btn btn--alt')

    console.log(profilePage.classList)
    console.log(friendStatus.updateProfile)
    friendStatus.updateProfile(false, {
      profilePage: profilePage,
      friendButton: friendStatusButton
    })

    profilePage = window.document.getElementsByClassName('page__profile').item(0)
    friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)

    expect(profilePage.classList).toMatchObject({0: 'page__profile'})
    expect(friendStatusButton.classList).toMatchObject({0: 'btn'})
  })

  test('set friendStatus false', () => {
    window.document.body.innerHTML = `${addFriendButtonMock}${pageProfileMock}`
    const friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)
    const event = {target: friendStatusButton}
    friendStatus.updateProfile = jest.fn()
    localStorage.setItem('friendStatus', 'true')

    friendStatus.clickAddFriend(event)

    expect(JSON.parse(localStorage.getItem('friendStatus'))).toBe(false)
  })

  test('set friendStatus true', () => {
    window.document.body.innerHTML = `${addFriendButtonMock}${pageProfileMock}`
    const friendStatusButton = window.document.getElementsByName('addAsFriend').item(0)
    const event = {target: friendStatusButton}
    friendStatus.updateProfile = jest.fn()
    localStorage.setItem('friendStatus', 'false')

    friendStatus.clickAddFriend(event)

    expect(JSON.parse(localStorage.getItem('friendStatus'))).toBe(true)
  })


})