import { useMemo } from 'react'
import { createLocationStorage, remember } from '@afojs/remember'
import { atom } from 'jotai'



import React from 'react'
import { useAtom, WritableAtom } from 'jotai'

import { Params, RegisterOptions, Search } from './types'


const defaultGetValueFromEvent = (e: unknown) => {
  if (e !== null && typeof e === 'object' && 'target' in e) {
    if ((e as React.ChangeEvent<HTMLInputElement>).target.value) {
      return (e as React.ChangeEvent<HTMLInputElement>).target.value
    }

  }
  return e
}

export const useStore = (searchAtom: WritableAtom<Params, Params>): Search => {
  const [params, setParams] = useAtom(searchAtom)

  const register = (name: string, options: RegisterOptions = {}) => {
    const { trigger = 'onChange', getValueFromEvent, valuePropName = 'value' } = options

    return {
      [valuePropName]: params[name] || undefined,
      [trigger]: (e: unknown) => {

        const value = getValueFromEvent ? getValueFromEvent(e) : defaultGetValueFromEvent(e)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: dropValue, ...restParams } = params

        // remove nullish key
        let nextParams
        if (value === null || value === undefined || value === '') {
          nextParams = restParams
        } else {
          nextParams = { ...restParams, [name]: value }
        }

        setParams(nextParams)
      }
    }
  }

  return [params, register]
}


export const useSearch = (namespace = 'afo/search') => {
  const reme = useMemo(() => remember(namespace, createLocationStorage()), [namespace])

  const searchAtom = useMemo(() => {
    const originAtom = atom(reme.get() ?? {})

    return atom<Params, Params>(
      (get) => get(originAtom),
      (_, set, update) => {
        set(originAtom, update)

        reme.set(update)
      }
    )
  }, [reme])

  const store = useStore(searchAtom)

  return store
}
