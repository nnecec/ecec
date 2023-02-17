import { remember, createLocationStorage } from "@afojs/remember";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import React from "react";
import { Params, RegisterOptions } from "./types";

const defaultGetValue = (e: unknown) => {
  if (
    e !== null &&
    typeof e === "object" &&
    "target" in e &&
    (e as React.ChangeEvent<HTMLInputElement>).target.value
  ) {
    return (e as React.ChangeEvent<HTMLInputElement>).target.value;
  }
  return e;
};

export const useSearch = (scope = "afo/search") => {
  const reme = useMemo(() => remember(scope, createLocationStorage()), [scope]);
  const searchAtom = useMemo(
    () =>
      atom<Params, Params[], any>({}, (_get, set, update) => {
        set(searchAtom, update);
        reme.set(update);
      }),
    [reme]
  );

  const [params, setParams] = useAtom(searchAtom);

  const register = (name: string, options: RegisterOptions = {}) => {
    const { trigger = "onChange", getValue, valuePropName = "value" } = options;

    return {
      [valuePropName]: params[name] || undefined,
      [trigger]: (e: unknown) => {
        const value =
          typeof getValue === "function" ? getValue(e) : defaultGetValue(e);

        const { [name]: dropParam, ...restParams } = params;
        // remove nullish key
        let nextParams;
        if (value === null || value === undefined || value === "") {
          nextParams = restParams;
        } else {
          nextParams = { ...restParams, [name]: value };
        }

        setParams(nextParams);
      },
    };
  };

  return [params, register];
};
