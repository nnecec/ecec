import { createContext } from 'react'
import { emitter } from '@afojs/emitter'

import type { EventType } from '@afojs/emitter'

export const createEmitterContext = <T extends Record<EventType, unknown>>() =>
  createContext(emitter<T>())
