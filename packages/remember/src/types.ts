export interface Storage {
  set: (key: string, value: string) => void
  get: (key: string) => string | null
  remove: (key: string) => void
  clear: () => void
}

export type Value = string | null | number | Value[]

export type Values = Record<string, Value>
