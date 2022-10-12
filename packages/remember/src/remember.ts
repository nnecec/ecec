import { createCacheStorage } from './adapter'
import { Storage, Value, Values } from './types'
import { toParsed, toStringify } from './utils'

export class Remember {
  storage: Storage
  name: string

  constructor(name: string, storage?: Storage) {
    this.name = name
    this.storage = storage ?? createCacheStorage()
  }

  set(key: string | Record<string, Value>, value?: Value) {
    if (key !== undefined && value !== undefined) {
      const cachedValue = this.get()
      cachedValue[key as string] = value
      this.storage.set(this.name, toStringify(cachedValue))
    } else if (key !== undefined && value === undefined) {
      this.storage.set(this.name, toStringify(key as Record<string, Value>))
    }
  }

  get(key: string): Value
  get(key: string[]): Record<string, Value>
  get(): Values
  get(key?: string | string[]) {
    const cached = this.storage.get(this.name)
    if (cached === null) {
      return null
    }
    const values = toParsed(cached)

    if (Array.isArray(key)) {
      return values
    }
    return values as Values
  }

  remove(keys?: string | string[]) {
    const removedKeys = keys ? (Array.isArray(keys) ? keys : [keys]) : []
    const values = this.get() as Record<string, Value>

    for (const key of removedKeys) {
      delete values[key]
    }

    this.storage.set(this.name, toStringify(values))
  }

  clear() {
    this.storage.remove(this.name)
  }

  reset() {
    this.storage.clear()
  }
}

export const remember = (name: string, storage?: Storage) => {
  return new Remember(name, storage)
}
