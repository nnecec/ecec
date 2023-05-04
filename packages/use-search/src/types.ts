export type ParamKey = string | number
export type ParamValue = any

export type Params = {
  [key: ParamKey]: ParamValue
}

export interface SearchOptions {
  trigger?: string
  searchTrigger?: string
  getValueFromEvent?: (...args: any[]) => ParamValue
  getValueProps?: (value: any) => Record<string, any>
  [K:string]: any
}

export type UseSearchOptions = {
  onSearch?: (params: Params) => void
  onInitialize?: (params: Params) => void
}
