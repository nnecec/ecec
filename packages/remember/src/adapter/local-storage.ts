interface Options {
  // localstorage expired duration
  expired: number
}

export const createLocalStorage = ({ expired = 0 }: Options) => {
  const time = {
    previousTime: Date.now(),
    expired,
  }
  console.log(time)

  return {
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
