export function toStringify(value: Record<string, unknown> | undefined): string {
  try {
    if (value === undefined) {
      return ''
    }
    return JSON.stringify(value)
  } catch (error) {
    console.log(value, error)
    return ''
  }
}

export function toParsed(value: string): Record<string, unknown> {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.log(value, error)
    return {}
  }
}

export const isPlainObject = (obj: unknown): obj is Record<string, unknown> =>
  !!obj && obj.constructor === Object
