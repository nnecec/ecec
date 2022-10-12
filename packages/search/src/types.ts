export type ParamKey = string | number
export type ParamValue = any

export interface Params {
  [key: ParamKey]: ParamValue
}

export interface RegisterOptions {
  trigger?: string
  getValueFromEvent?: <T extends Element>(e: React.ChangeEvent<T> | unknown) => ParamValue
  valuePropName?: string
}

export interface Search {
  params: Params
  register: (name: string, options?: RegisterOptions) => any
}

