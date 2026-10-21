
const storageKey = 'loggedBlogappUser'

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(storageKey)
  if (loggedUserJSON) {
    return JSON.parse(loggedUserJSON)
  }
  return null
}

const saveUser = (user) => {
  window.localStorage.setItem(storageKey, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(storageKey)
}

export default { getUser, saveUser, removeUser }