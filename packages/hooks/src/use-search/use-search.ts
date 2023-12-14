import { useState } from 'react'

import { useCore } from './core'
import { defaultGetValue, isPlainObject } from './utils'

import type { Params, SearchOptions, UseSearchProps } from './types'
import { useRemember } from './remember'

export const useSearch = (props: UseSearchProps = {}) => {
  const { name, defaultValue } = props
  const remember = useRemember(name)
  const initialState = remember?.get() ?? defaultValue
  const [params, updateParams] = useState<Params>(initialState ?? {})
  const [displays, updateDisplays] = useState<Params>(params)

  const core = useCore({ ...props, defaultValue: initialState }, params => {
    updateParams({ ...params })
    updateDisplays({ ...params })
    remember?.set(params)
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

      const param = displays[name]

      const valueProp = typeof getValueProps === 'function' ? getValueProps(param) : { [valuePropName]: param }

      const searchTriggers = typeof searchTrigger === 'string' ? [searchTrigger] : searchTrigger

      const triggers = Object.fromEntries([
        ...searchTriggers.map(searchTrigger => [
          searchTrigger,
          (...args: any[]) => {
            options[searchTrigger]?.(...args)
            core.trigger()
          },
        ]),
        [
          trigger,
          (...args: any[]) => {
            options[trigger]?.(...args)

            const nextValue =
              typeof getValueFromEvent === 'function' ? getValueFromEvent(...args) : defaultGetValue(args[0])

            core.setParam(name, nextValue)
            updateDisplays({ ...displays, [name]: nextValue })
            if (searchTriggers.includes(trigger)) {
              core.trigger()
            }
          },
        ],
      ])

      return {
        ...valueProp,
        ...triggers,
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
