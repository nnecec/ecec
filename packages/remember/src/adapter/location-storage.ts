export const createLocationStorage = () => {
  return {
    name: 'location-storage',
    set: (key: string, value: string) => {
      const query = new URLSearchParams(location.search.slice(1))
      query.set(key, value)
      const url = `${location.pathname}?${query.toString()}`
      history.replaceState({ url }, '', url)
    },
    get: (key: string) => {
      const query = new URLSearchParams(location.search.slice(1))
      return query.get(key)
    },
    remove: (key: string) => {
      const query = new URLSearchParams(location.search.slice(1))
      query.delete(key)
      const url = `${location.pathname}?${query.toString()}`
      history.replaceState({ url }, '', url)
    },
    clear: () => {
      const url = `${location.pathname}`
      history.replaceState({ url }, '', url)
    },
  }
}
