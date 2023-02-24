export interface Storage {
  set: (key: string, value: string) => void
  get: (key: string) => string | null
  remove: (key: string) => void
  clear: () => void
}

export type Value = string | null | number | Value[] | object

export type Values = Value | Record<string, Value>

export interface Options {
  storage?: Storage
  /** the life time of cache in seconds */
  maxAge?: number
}
