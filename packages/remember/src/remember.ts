import { createCacheStorage } from './adapter'
import { Options, Storage, Value, Values } from './types'
import { checkExpired, isPlainObject, toParsed, toStringify } from './utils'

export class Remember {
  storage: Storage
  name: string
  maxAge: number | null
  expiredAt?: number

  constructor(name: string, options: Options = {}) {
    this.name = name
    this.storage = options.storage ?? createCacheStorage()
    this.maxAge =
      typeof options.maxAge === 'number' ? options.maxAge * 1000 : null
  }

  set(path: Value | Values): void
  set(path: string, value: Value | Values): void
  @checkExpired
  set(path: string | Value | Values, value?: Value | Values): void {
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

  @checkExpired
  get(path?: string | string[]): Values | undefined {
    const cached = this.storage.get(this.name)
    if (cached === null) {
      return undefined
    }
    const values = toParsed(cached)

    if (Array.isArray(path)) {
      return values
    }
    return values
  }

  @checkExpired
  remove(keys?: string | string[]): void {
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

  @checkExpired
  clear() {
    this.storage.remove(this.name)
  }
}

export const remember = (name: string, options?: Options) => {
  return new Remember(name, options)
}
