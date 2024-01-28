import React from 'react'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { useAppSelector } from '@/app/hooks'
import { selectAllUsers } from '@/features/users/usersSlice'

import { selectAllNotifications } from './notificationsSlice'

const UNKNOWN_USER = {
  name: 'Unknown User',
}

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications)
  const users = useAppSelector(selectAllUsers)

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) ?? UNKNOWN_USER

    return (
      <div key={notification.id} className="notification">
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
