export const createLocalStorage = () => {
  return {
    name: 'local-storage',
    set: (key: string, value: string) => {
      window.localStorage.setItem(key, value)
    },
    get: (key: string) => {
      return window.localStorage.getItem(key)
    },
    remove: (key: string) => {
      window.localStorage.removeItem(key)
    },
    clear: () => {
      window.localStorage.clear()
    },
  }
}
