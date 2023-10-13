export const defaultGetValue = (e: any) => {
  if (e !== null && typeof e === 'object' && 'value' in e) {
    return e.value
  } else if (e !== null && typeof e === 'object' && 'target' in e) {
    return (e as React.ChangeEvent<HTMLInputElement>).target.value
  }
  return e
}

export const isPlainObject = (obj: unknown): obj is Record<string, any> =>
  !!obj && obj.constructor === Object
