import { createCacheStorage } from './adapter'
import { isPlainObject, toParsed, toStringify } from './utils'

import type { RememberOptions, Storage } from './types'

export class Remember<T = any> {
  storage: Storage
  name: string
  /** unit: seconds  */
  maxAge?: number
  expiredAt?: number

  constructor(name: string, options: RememberOptions = {}) {
    this.name = name
    this.storage = options.storage ?? createCacheStorage()
    this.maxAge = typeof options.maxAge === 'number' ? options.maxAge * 1000 : undefined
    this.checkExpired()
  }

  set(value: Record<string, T>): void
  set(path: string, value: T): void
  set(path: string | Record<string, T>, value?: T): void {
    this.checkExpired()
    if (typeof path === 'string' && value !== undefined) {
      let cachedValue = this.get()

      if (cachedValue) {
        cachedValue[path] = value
      } else {
        cachedValue = { [path]: value }
      }

      this.storage.set(this.name, toStringify(cachedValue))
    } else if (isPlainObject(path) && value === undefined) {
      this.storage.set(this.name, toStringify(path))
    }
  }

  get(): Record<string, T>
  get(path: string): T
  get(path: string[]): Record<string, T>
  get(path?: string | string[]): Record<string, T> | T | undefined {
    this.checkExpired()
    const cached = this.storage.get(this.name)
    if (cached === null) {
      return undefined
    }
    const values = toParsed(cached)

    if (Array.isArray(path)) {
      return values as Record<string, T>
    } else if (typeof path === 'string') {
      return values[path] as T
    }
    return values as Record<string, T>
  }

  remove(keys?: string | string[]): void {
    this.checkExpired()
    const values = this.get()
    if (keys && isPlainObject(values)) {
      const removedKeys = Array.isArray(keys) ? keys : [keys]

      for (const key of removedKeys) {
        delete values[key]
      }
      this.storage.set(this.name, toStringify(values))
    } else {
      this.storage.clear()
    }
  }

  private clear() {
    this.storage.remove(this.name)
  }

  // TODO: refactor: TypeScript 5.0 decorator
  private checkExpired() {
    if (this.maxAge) {
      const lifePath = `__${this.name}_life__`
      const last = this.get(lifePath)

      this.expiredAt = last ? Number(last) + this.maxAge : Date.now() + this.maxAge

      if (this.expiredAt) {
        if (Date.now() >= this.expiredAt) {
          this.clear()
        } else {
          this.set(lifePath, this.expiredAt as T)
        }
      }
    }
  }
}

export const remember = <T = any>(name: string, options?: RememberOptions) => {
  return new Remember<T>(name, options)
}
