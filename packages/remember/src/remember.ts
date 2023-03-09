import { createCacheStorage } from './adapter'
import { isPlainObject, toParsed, toStringify } from './utils'

import type { Options, Storage, Value, Values } from './types'

export class Remember {
  storage: Storage
  name: string
  maxAge: number | null
  expiredAt?: number

  constructor (name: string, options: Options = {}) {
    this.name = name
    this.storage = options.storage ?? createCacheStorage()
    this.maxAge =
      typeof options.maxAge === 'number' ? options.maxAge * 1000 : null
    this.checkExpired()
  }

  set(path: Value | Values): void
  set(path: string, value: Value | Values): void
  set (path: string | Value | Values, value?: Value | Values): void {
    this.checkExpired()
    if (typeof path === 'string' && value !== undefined) {
      let cachedValue = this.get()

      if (isPlainObject(cachedValue)) {
        cachedValue[path] = value
      } else {
        cachedValue = value
      }

      this.storage.set(this.name, toStringify(cachedValue))
    } else if (path !== undefined && value === undefined) {
      this.storage.set(this.name, toStringify(path))
    }
  }

  get (path?: string | string[]): Values | undefined {
    this.checkExpired()
    const cached = this.storage.get(this.name)
    if (cached === null) {
      return undefined
    }
    const values = toParsed(cached)

    if (Array.isArray(path)) {
      return values
    } else if (typeof path === 'string') {
      return values[path]
    }
    return values
  }

  remove (keys?: string | string[]): void {
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

  clear () {
    this.storage.remove(this.name)
  }

  // TODO: refactor: TypeScript 5.0 decorator
  private checkExpired () {
    if (this.maxAge) {
      const lifePath = `__${this.name}_life__`
      const last = this.get(lifePath)

      this.expiredAt = last ? Number(last) + this.maxAge : Date.now() + this.maxAge

      if (this.expiredAt) {
        if (Date.now() >= this.expiredAt) {
          this.clear()
        } else {
          this.set(lifePath, this.expiredAt)
        }
      }
    }
  }
}

export const remember = (name: string, options?: Options) => {
  return new Remember(name, options)
}
