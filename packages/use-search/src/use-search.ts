import { useMemo, useState } from 'react'
import { useMemoizedFn } from '@afojs/react-utils'
import { createLocationStorage, remember } from '@afojs/remember'

import type React from 'react'

import type { Params, SearchOptions, UseSearchOptions } from './types'

export const isPlainObject = (obj: unknown): obj is Record<string, any> =>
  !!obj && obj.constructor === Object

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

export const useSearch = (
  scope?: string | UseSearchOptions,
  useSearchOptions?: UseSearchOptions,
) => {
  const scopeName = typeof scope === 'string' ? scope : 'use-search'
  const scopeOptions =
    typeof scope === 'string' ? useSearchOptions : (scope as unknown as UseSearchOptions)

  const reme = useMemo(() => {
    if (typeof document !== 'undefined') {
      return remember(scopeName, { storage: createLocationStorage() })
    }
    return remember(scopeName)
  }, [scopeName])

  const [params, setParams] = useState<Params>(() => {
    const initialParams = reme.get() as Params
    typeof scopeOptions?.onInitialize === 'function' && scopeOptions.onInitialize(initialParams)
    return initialParams ?? {}
  })

  const search = useMemoizedFn((name?: string | Params, options: SearchOptions = {}): any => {
    const {
      trigger = 'onChange',
      searchTrigger = 'onChange',
      getValueFromEvent,
      getValueProps,
    } = options

    if (typeof name === 'string' && name.length > 0) {
      const valueProp =
        typeof getValueProps === 'function' ? getValueProps(params[name]) : { value: params[name] }

      const changeValue = (e: unknown) => {
        const value =
          typeof getValueFromEvent === 'function' ? getValueFromEvent(e) : defaultGetValue(e)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: dropedParam, ...restParams } = params
        // remove nullish key
        const nextParams =
          value === null || value === undefined || value === ''
            ? restParams
            : { ...restParams, [name]: value }

        setParams(nextParams)
        reme.set(nextParams)
        return nextParams
      }

      return {
        ...valueProp,
        [trigger]: (e: unknown) => {
          changeValue(e)
        },
        [searchTrigger]: (e: unknown) => {
          const nextParams = changeValue(e)
          scopeOptions?.onSearch?.(nextParams)
        },
      }
    } else if (isPlainObject(name)) {
      const nextParams = { ...params, ...name }
      setParams(nextParams)
      reme.set(nextParams)
      scopeOptions?.onSearch?.(nextParams)
    }
  })

  return [search, params] as const
}
