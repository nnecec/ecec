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
      name,
      [valuePropName]: params[name] || undefined,
      [trigger]: (e: unknown) => {

        const value = getValueFromEvent ? getValueFromEvent(e) : defaultGetValueFromEvent(e)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: dropValue, ...restParams } = params

        // remove unused key
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

  return { params, register }
}
