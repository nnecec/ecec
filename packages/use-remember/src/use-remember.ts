import { useEffect, useRef } from 'react'
import { remember } from '@afojs/remember'

import type { Remember, RememberOptions } from '@afojs/remember'

export const useRemember = <T = any>(name: string, options?: RememberOptions) => {
  const rememberRef = useRef<Remember<T>>(remember(name))

  useEffect(() => {
    if (typeof document !== 'undefined') {
      rememberRef.current = remember(name, options)
    }
  }, [name, options])

  return rememberRef.current
}
