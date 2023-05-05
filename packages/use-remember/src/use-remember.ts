import { useEffect, useRef } from 'react'
import { remember } from '@afojs/remember'

import type { Remember, RememberOptions } from '@afojs/remember'

export const useRemember = (name: string, options?: RememberOptions) => {
  const reme = useRef<Remember>(remember(name))

  useEffect(() => {
    if (typeof document === 'undefined') {
      reme.current = remember(name, options)
    }
  }, [name, options])

  return reme.current
}
