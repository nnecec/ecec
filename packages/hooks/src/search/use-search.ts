import React, { useMemo } from 'react'
import { createLocationStorage, remember } from '@afojs/remember'
import { atom, useAtom } from 'jotai'

import { Params, RegisterOptions, Search } from './types'

const defaultGetValue = (e: unknown) => {
  if (
    e !== null &&
    typeof e === 'object' &&
    'target' in e &&
    (e as React.ChangeEvent<HTMLInputElement>).target.value
  ) {
    return (e as React.ChangeEvent<HTMLInputElement>).target.value
  }
  return e
}

export const useSearch = (scope = 'afo/search'): Search => {
  const reme = useMemo(
    () => remember(scope, { storage: createLocationStorage() }),
    [scope],
  )
  const searchAtom = useMemo(
    () =>
      atom<Params, Params[], any>({}, (_get, set, update) => {
        set(searchAtom, update)
        reme.set(update)
      }),
    [reme],
  )

  const [params, setParams] = useAtom(searchAtom)

  const register = (name: string, options: RegisterOptions = {}) => {
    const { trigger = 'onChange', getValue, valuePropName = 'value' } = options

    return {
      [valuePropName]: params[name] || undefined,
      [trigger]: (e: unknown) => {
        const value =
          typeof getValue === 'function' ? getValue(e) : defaultGetValue(e)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: dropParam, ...restParams } = params
        // remove nullish key
        const nextParams =
          value === null || value === undefined || value === ''
            ? restParams
            : { ...restParams, [name]: value }

        setParams(nextParams)
      },
    }
  }

  return [params, register]
}
