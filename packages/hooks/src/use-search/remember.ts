import { useRef } from 'react'
import { Remember, createLocationStorage } from '@ecec/remember'

export const useRemember = (name?: string) => {
  if (!name) return
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remember = useRef(new Remember(name, { storage: createLocationStorage() }))
  return remember.current
}
