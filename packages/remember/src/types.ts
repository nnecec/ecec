export interface Storage {
  set: (key: string, value: string) => void
  get: (key: string) => string | null
  remove: (key: string) => void
  clear: () => void
}

export type Values<T = any> = Record<string, T>

export interface RememberOptions {
  storage?: Storage
  /** the life time of cache in seconds */
  maxAge?: number
}
