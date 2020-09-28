/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function checkNotification(): boolean {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    Notification.permission === 'granted'
  )
}

export function enableNotifications():
  | Promise<NotificationPermission>
  | boolean {
  try {
    if (!checkNotification()) {
      return Notification.requestPermission()
    }
    return false
  } catch (e) {
    console.error(e)
    return false
  }
}
