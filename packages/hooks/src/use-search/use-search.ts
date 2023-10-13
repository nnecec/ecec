import { useMemo, useState } from 'react'
import { createLocationStorage, remember } from '@ecec/remember'

import { useCore } from './core'
import { defaultGetValue, isPlainObject } from './utils'

import type { Params, SearchOptions, UseSearchProps } from './types'

export const useSearch = (props: UseSearchProps = {}) => {
  const [params, updateParams] = useState<Params>({})

  const { defaultValue, name } = props

  const reme = useMemo(
    () =>
      name
        ? remember(name, {
            storage: typeof document === 'undefined' ? undefined : createLocationStorage(),
          })
        : undefined,
    [name],
  )

  const core = useCore({ ...props, defaultValue: reme?.get() ?? defaultValue }, params => {
    updateParams({ ...params })
    name && reme?.set(params)
  })

  function search(params: Params): void
  function search(name: string, options: SearchOptions): Record<string, any>
  function search(name: Params | string, options: SearchOptions = {}) {
    if (typeof name === 'string' && name.length > 0) {
      const {
        getValueFromEvent,
        getValueProps,
        trigger = 'onChange',
        searchTrigger = trigger,
        valuePropName = 'value',
      } = options

      const param = core.get(name)

      const valueProp =
        typeof getValueProps === 'function' ? getValueProps(param) : { [valuePropName]: param }

      return {
        ...valueProp,
        [searchTrigger](...args: any[]) {
          options[searchTrigger]?.(...args)
          core.trigger()
        },
        [trigger](...args: any[]) {
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
