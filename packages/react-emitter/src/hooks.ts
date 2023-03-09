import { useMemo } from 'react'
import { emitter } from '@afojs/emitter'

import type { EventType } from '@afojs/emitter'

export const useEmitter = <T extends Record<EventType, unknown>>() => {
  return useMemo(() => emitter<T>(), [])
}
