import { useEffect } from 'react'
import { UserManager } from '@app/managers'

export const useAuthedRedirect = () => {
  useEffect(() => {
    process.nextTick(() => {
      if (UserManager.loggedIn) {
        window.location.href = '/dashboard'
      }
    })
  }, [])
}
