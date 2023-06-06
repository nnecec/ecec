import type { Dispatch } from 'react'

import { ActionTypes } from './types'
import { defaultGetValue } from './utils'

import type { Action, Params, ParamValue, SearchOptions } from './types'

export function useControlledSearch(
  params: Params,
  dispatch: Dispatch<Action>,
): (name: string, options: SearchOptions) => any {
  return (name: string, options: SearchOptions) => {
    const param = params[name]
    const {
      trigger = 'onChange',
      searchTrigger = trigger,
      getValueFromEvent,
      getValueProps,
      valuePropName = 'value',
    } = options

    const triggerSearch = (nextValue: ParamValue) => {
      dispatch({
        type: ActionTypes.ChangeParam,
        key: name,
        value: nextValue,
      })
    }

    const valueProp =
      typeof getValueProps === 'function' ? getValueProps(param) : { [valuePropName]: param }

    return {
      ...valueProp,
      [searchTrigger]: (...args: any[]) => {
        options[searchTrigger]?.(...args)
        triggerSearch(param)
      },
      [trigger]: (...args: any[]) => {
        options[trigger]?.(...args)

        const nextValue =
          typeof getValueFromEvent === 'function' ? getValueFromEvent(...args) : defaultGetValue(args[0])

        if (searchTrigger === trigger) {
          triggerSearch(nextValue)
        }
      },
    }
  }
}
