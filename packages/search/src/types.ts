export type ParamKey = string | number
export type ParamValue = any

export interface Params {
  [key: ParamKey]: ParamValue
}

export interface RegisterOptions {
  trigger?: string
  getValueFromEvent?: (...args: any[]) => ParamValue
  valuePropName?: string
}

export type Search = [
  params: Params,
  register: (name: string, options?: RegisterOptions) => any
]

