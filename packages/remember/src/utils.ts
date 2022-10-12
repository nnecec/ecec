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
