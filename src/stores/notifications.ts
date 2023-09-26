import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => {
    return {
      notifications: [] as Notification[]
    }
  },

  actions: {
    addNotification(notification: Notification) {
      this.notifications.push(notification)
    },

    removeNotification(notificationId: Notification['id']) {
      this.notifications = this.notifications.filter(
        (notification: Notification) => notification.id !== notificationId
      )
    }
  },

  getters: {
    notificationsCount: (state) => state.notifications.length
  }
})

interface Notification {
  text: string
  id: number | string
  date: Date
}
