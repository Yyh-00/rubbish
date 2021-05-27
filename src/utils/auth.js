// import Cookies from 'js-cookie'

const TokenKey = 'LJ_token'
const Identity = 'LJ_identity'
const UserService = 'LJ_userService'
const UserAccount = 'LJ_userAccount'

export function getToken() {
  // return Cookies.get(TokenKey)
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return window.sessionStorage.removeItem(TokenKey)
}

export function getIdentity() {
  return window.sessionStorage.getItem(Identity)
}

export function setIdentity(identity) {
  return window.sessionStorage.setItem(Identity, identity)
}

export function removeIdentity() {
  return window.sessionStorage.removeItem(Identity)
}
export function getUserService() {
  return window.sessionStorage.getItem(UserService)
}

export function setUserService(userService) {
  return window.sessionStorage.setItem(UserService, userService)
}

export function removeUserService() {
  return window.sessionStorage.removeItem(UserService)
}
export function getUserAccount() {
  return window.sessionStorage.getItem(UserAccount)
}

export function setUserAccount(userAccount) {
  return window.sessionStorage.setItem(UserAccount, userAccount)
}

export function removeUserAccount() {
  return window.sessionStorage.removeItem(UserAccount)
}
