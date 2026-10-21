import { create } from 'zustand'

 export const useNotificationStore = create((set) => ({
  notification: {
    message:null,
    type:null,
  }, 

  showNotification: (message, type = 'success') => {
    set({ notification: { message, type } })

    setTimeout(() => {
      set({ notification: null })
    }, 5000)
  },

  
  clearNotification: () => set({ notification: null })
}))


