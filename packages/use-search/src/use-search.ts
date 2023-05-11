import { useEffect, useMemo, useState } from 'react'

import { remember, createLocationStorage } from '@afojs/remember'

import type React from 'react'

import type { Params, SearchOptions, UseSearchOptions } from './types'

export const isPlainObject = (obj: unknown): obj is Record<string, any> =>
  !!obj && obj.constructor === Object

const DefaultSearchName = 'afojs/use-search'

const defaultGetValue = (args: any[]) => {
  const e = args[0]

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

  const reme = useMemo(() => {
    if (typeof document !== 'undefined') {
      return remember(searchName, {
        storage: searchName === DefaultSearchName ? undefined : createLocationStorage(),
      })
    }
    return remember(searchName)
  }, [searchName])

  const [internalParams, setInternalParams] = useState<Params>({})
  const [params, setParams] = useState(internalParams)

  // update params from reme
  useEffect(() => {
    const initialParams = reme.get() ?? searchOptions?.initialValues ?? {}
    typeof searchOptions?.onInitialize === 'function' && searchOptions.onInitialize(initialParams)
    setInternalParams(initialParams)
    setParams(initialParams)
  }, [reme])

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
      reme.set(nextParams)
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
        [trigger]: (...args: any[]) => {
          options[trigger]?.(args)

          const newValue =
            typeof getValueFromEvent === 'function'
              ? getValueFromEvent(args)
              : defaultGetValue(args)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [name]: dropedParam, ...restParams } = internalParams
          // remove nullish key
          const nextParams =
            newValue === null || newValue === undefined || newValue === ''
              ? restParams
              : { ...restParams, [name]: newValue }
          console.log(nextParams)
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
