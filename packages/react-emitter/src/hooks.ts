import { useMemo } from 'react'
import { emitter, EventType } from '@afojs/emitter'

export const useEmitter = <T extends Record<EventType, unknown>>() => {
  return useMemo(() => emitter<T>(), [])
}
