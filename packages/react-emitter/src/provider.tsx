import { emitter, EventType } from '@afojs/emitter'
import { createContext } from 'react'

export const createEmitterContext = <T extends Record<EventType, unknown>>() =>
  createContext(emitter<T>())
