export type ParamKey = string | number;
export type ParamValue = any;

export type Params = {
  [key: ParamKey]: ParamValue;
};

export interface RegisterOptions {
  trigger?: string;
  getValue?: (...args: any[]) => ParamValue;
  valuePropName?: string;
}

export type Search = [
  params: Params,
  register: (name: string, options?: RegisterOptions) => any
];
