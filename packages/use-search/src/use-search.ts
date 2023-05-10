import { useState } from 'react'
import { createLocationStorage, useRemember } from '@afojs/use-remember'

import type React from 'react'

import type { Params, SearchOptions, UseSearchOptions } from './types'

export const isPlainObject = (obj: unknown): obj is Record<string, any> =>
  !!obj && obj.constructor === Object

const DefaultSearchName = 'afojs/use-search'

const defaultGetValue = (e: unknown) => {
  if (e !== null && typeof e === 'object' && 'value' in e) {
    return e.value
  } else if (e !== null && typeof e === 'object' && 'target' in e) {
    return (e as React.ChangeEvent<HTMLInputElement>).target.value
  }
  return e
}

export const useSearch = (
  scope?: string | UseSearchOptions,
  useSearchOptions?: UseSearchOptions,
) => {
  const searchName = typeof scope === 'string' ? scope : DefaultSearchName
  const searchOptions = typeof scope === 'string' ? useSearchOptions : (scope as UseSearchOptions)
  const remember = useRemember<Params>(searchName, {
    storage: searchName === DefaultSearchName ? undefined : createLocationStorage(),
  })

  const [internalParams, setInternalParams] = useState<Params>(() => {
    const initialParams = remember.get() ?? searchOptions?.initialValues ?? {}
    typeof searchOptions?.onInitialize === 'function' && searchOptions.onInitialize(initialParams)
    return initialParams
  })

  // dirty implementation
  // useEffect(() => {
  //   const initialParams = remember.get() ?? {}
  //   setInternalParams(initialParams)
  //   typeof searchOptions?.onInitialize === 'function' && searchOptions.onInitialize(initialParams)
  // }, [remember])

  const [params, setParams] = useState(internalParams)

  const search = (name?: string | Params, options: SearchOptions = {}): any => {
    const {
      trigger = 'onChange',
      searchTrigger = trigger,
      getValueFromEvent,
      getValueProps,
      valuePropName = 'value',
    } = options

    const triggerSearch = (nextParams: Params) => {
      setParams(nextParams)
      remember.set(nextParams)
      searchOptions?.onSearch?.(nextParams)
    }

    if (typeof name === 'string' && name.length > 0) {
      const valueProp =
        typeof getValueProps === 'function'
          ? getValueProps(internalParams[name])
          : { [valuePropName]: internalParams[name] }

      return {
        ...valueProp,
        [searchTrigger]: (e: any) => {
          options[searchTrigger]?.(e)
          triggerSearch(internalParams)
        },
        [trigger]: (e: any) => {
          options[trigger]?.(e)

          const newValue =
            typeof getValueFromEvent === 'function' ? getValueFromEvent(e) : defaultGetValue(e)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [name]: dropedParam, ...restParams } = internalParams
          // remove nullish key
          const nextParams =
            newValue === null || newValue === undefined || newValue === ''
              ? restParams
              : { ...restParams, [name]: newValue }

          setInternalParams(nextParams)

          if (searchTrigger === trigger) {
            triggerSearch(nextParams)
          }
        },
      }
    } else if (isPlainObject(name)) {
      const nextParams = { ...internalParams, ...name }
      setInternalParams(nextParams)
      triggerSearch(nextParams)
    }
  }

  return [search, params] as const
}
