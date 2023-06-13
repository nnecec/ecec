'use client'

import { useMemo, useState } from 'react'
import { createLocationStorage, remember } from '@ecec/remember'

import { useCore } from './core'
import { defaultGetValue, isPlainObject } from './utils'

import type { Params, SearchOptions, UseSearchProps } from './types'

const DEFAULT_NAME = 'ecec/use-search'

export const useSearch = (props: UseSearchProps = {}) => {
  const [params, updateParams] = useState<Params>()

  const reme = useMemo(() => {
    const searchName = props.name ?? DEFAULT_NAME

    return remember(searchName, {
      storage:
        searchName === DEFAULT_NAME || typeof window === 'undefined'
          ? undefined
          : createLocationStorage(),
    })
  }, [props.name])

  const core = useCore({ ...props, initialValues: reme.get() ?? props.initialValues }, params => {
    updateParams({ ...params })
    reme.set({ ...params })
  })

  function search(params: Params): void
  function search(name: string, options: SearchOptions): Record<string, any>
  function search(name: string | Params, options: SearchOptions = {}) {
    if (typeof name === 'string' && name.length > 0) {
      const {
        trigger = 'onChange',
        searchTrigger = trigger,
        getValueFromEvent,
        getValueProps,
        valuePropName = 'value',
      } = options

      const param = core.get(name)

      const valueProp =
        typeof getValueProps === 'function' ? getValueProps(param) : { [valuePropName]: param }

      return {
        ...valueProp,
        [searchTrigger]: (...args: any[]) => {
          options[searchTrigger]?.(...args)
          core.trigger()
        },
        [trigger]: (...args: any[]) => {
          options[trigger]?.(...args)

          const nextValue =
            typeof getValueFromEvent === 'function'
              ? getValueFromEvent(...args)
              : defaultGetValue(args[0])

          core.setParam(name, nextValue)
          if (searchTrigger === trigger) {
            core.trigger()
          }
        },
      }
    } else if (isPlainObject(name)) {
      core.setParams(name)
      core.trigger()
      return
    }
    throw new Error(`invalid search name: ${name}`)
  }

  return [search, params] as const
}
