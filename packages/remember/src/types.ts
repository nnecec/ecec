export interface Storage {
  name?: string
  set: (key: string, value: string) => void
  get: (key: string) => string | null
  remove: (key: string) => void
  clear: () => void
}

export interface RememberOptions {
  storage?: Storage
  /** the life time of cache in seconds */
  maxAge?: number
}
