import type { ReactNode } from 'react'

export type ParamKey = string
export type ParamValue = any

export type Params = {
  [key: ParamKey]: ParamValue
}

// API Reference: https://ant.design/components/form-cn#formitem
export interface SearchOptions {
  trigger?: string
  searchTrigger?: string | string[]
  getValueFromEvent?: (...args: any[]) => ParamValue
  getValueProps?: (value: any) => Record<string, any>
  valuePropName?: string
  [K: string]: any
}

export type CoreProps = {
  onSearch?: (params?: Params) => void
  onInit?: (params?: Params) => void
  defaultValue?: Params
}

export type UseSearchProps = CoreProps & {
  name?: string
  children?: ReactNode
}
