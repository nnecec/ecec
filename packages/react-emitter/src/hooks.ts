import { useContext, useMemo } from 'react'
import { emitter, Emitter } from '@afojs/emitter'
import { EmitterContext } from './provider'

export const useEmitter = <T>() => {
  const contextEmitter = useContext(EmitterContext)

  return useMemo<Emitter<T>>(
    () => (contextEmitter instanceof Emitter ? contextEmitter : emitter<T>()),
    [],
  )
}
