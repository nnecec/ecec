import type { Storage } from '../types'

export const createSessionStorage = (): Storage => {
  return {
    name: 'session-storage',
    set (key: string, value: string) {
      window.sessionStorage.setItem(key, value)
    },
    get (key: string) {
      return window.sessionStorage.getItem(key)
    },
    remove (key: string) {
      window.sessionStorage.removeItem(key)
    },
    clear () {
      window.sessionStorage.clear()
    },
  }
}
