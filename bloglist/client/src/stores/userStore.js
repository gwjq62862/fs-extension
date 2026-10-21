import { create } from 'zustand'
import blogService from '../services/blog'
import userService from '../services/user'
import loginService from '../services/login'
import persistentUser from '../services/persistentUser'
export const useUserStore = create((set) => ({
  user: (() => {
    const parsedUser = persistentUser.getUser()
    if (parsedUser) {
      blogService.setToken(parsedUser.token)
      userService.setToken(parsedUser.token)
      return parsedUser
    }
    return null
  })(),


  login: async (credentials) => {
    const user = await loginService.login(credentials)
    persistentUser.saveUser(user)
    blogService.setToken(user.token)
    userService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    persistentUser.removeUser()
    blogService.setToken(null)
    userService.setToken(null)
    set({ user: null })
  }
}))


