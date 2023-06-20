export const createLocationStorage = () => {
  return {
    clear: () => {
      const url = `${location.pathname}`
      history.replaceState({ url }, '', url)
    },
    get: (key: string) => {
      const query = new URLSearchParams(location.search)
      return query.get(key)
    },
    name: 'location-storage',
    remove: (key: string) => {
      const query = new URLSearchParams(location.search)
      query.delete(key)
      const url = `${location.pathname}?${query.toString()}`
      history.replaceState({ url }, '', url)
    },
    set: (key: string, value: string) => {
      const query = new URLSearchParams(location.search)
      query.set(key, value)
      const url = `${location.pathname}?${query.toString()}`
      history.replaceState({ url }, '', url)
    },
  }
}
