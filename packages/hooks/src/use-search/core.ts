import { useRef } from 'react'

import type { CoreProps, ParamKey, Params, ParamValue } from './types'

export class Core {
  name?: string;
  params: Params;
  onSearch?: (params: Params) => any;
  callback?: (params: Params) => any;

  constructor (props: CoreProps, callback?: (params: Params) => any) {
    this.params = props.defaultValue ?? {}

    this.callback = callback
    this.onSearch = props.onSearch

    props.onInit?.(this.params)
    callback?.(this.params)
  }

  setParam (key: ParamKey, value: ParamValue) {
    if (value === null || value === undefined || value === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: dropped, ...restParams } = this.params
      this.params = restParams
      return
    }
    this.params[key] = value
  }

  setParams (params: Params) {
    Object.entries(params).forEach(([key, value]) => this.setParam(key, value))
    this.callback?.(this.params)
  }

  get (key: ParamKey) {
    return this.params[key]
  }

  trigger () {
    this.onSearch?.(this.params)
    this.callback?.(this.params)
  }
}

export const useCore = (
  props: CoreProps,
  callback?: (params: Params) => any,
) => {
  const coreRef = useRef<Core>()

  if (!coreRef.current) {
    coreRef.current = new Core(props, callback)
  }

  return coreRef.current
}
