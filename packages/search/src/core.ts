import React, { useMemo } from 'react'
import { Atom, atom, useAtom } from 'jotai'

import { Params, RegisterOptions, Search } from './types'


const defaultGetValueFromEvent = (e: unknown) => {
  if (e !== null && typeof e === 'object' && 'target' in e) {
    return (e as React.ChangeEvent<HTMLInputElement>).target.value
  }
  return e
}

export const useStore = (searchAtom: Atom<Params>): Search => {
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

        // remove unuse key
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
