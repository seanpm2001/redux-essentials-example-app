import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { selectCurrentUsername, logout } from '@/features/auth/authSlice'
import { fetchNotifications, selectAllNotifications } from '@/features/notifications/notificationsSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'

import { UserIcon } from './UserIcon'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectCurrentUsername)
  const user = useAppSelector(selectCurrentUser)

  const notifications = useAppSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n) => !n.read).length

  const isLoggedIn = !!username && !!user

  let navContent: React.ReactNode = null

  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout())
    }

    const fetchNewNotifications = () => {
      dispatch(fetchNotifications())
    }

    let unreadNotificationsBadge: React.ReactNode | undefined

    if (numUnreadNotifications > 0) {
      unreadNotificationsBadge = <span className="badge">{numUnreadNotifications}</span>
    }

    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
          <button className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  )
}
