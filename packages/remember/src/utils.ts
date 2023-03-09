import { Remember } from './remember'

import type { Value } from './types'

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
