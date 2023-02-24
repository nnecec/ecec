import { Remember } from './remember'
import { Value } from './types'

export function toStringify(value: any): string {
  try {
    return JSON.stringify(value)
  } catch (error) {
    console.log(value, error)
    return ''
  }
}

export function toParsed(value: string): any {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.log(value, error)
    return {}
  }
}

export const isPlainObject = (obj: unknown): obj is Record<string, Value> =>
  !!obj && obj.constructor === Object

export function checkExpired(
  original: any,
  _context: ClassMethodDecoratorContext
) {
  return function (this: Remember, ...args: any[]) {
    if (this.maxAge) {
      const lifePath = `__${this.name}_life__`
      const last = this.get(lifePath)

      if (last) {
        this.expiredAt = Number(last) + this.maxAge
      } else {
        this.expiredAt = Date.now() + this.maxAge
      }

      if (this.expiredAt) {
        if (Date.now() >= this.expiredAt) {
          this.clear()
        } else {
          this.set(lifePath, this.expiredAt)
        }
      }
    }

    return original.call(this, ...args)
  }
}
