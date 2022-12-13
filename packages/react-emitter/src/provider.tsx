import { createContext } from 'react'
import { useEmitter } from './hooks'

export const EmitterContext = createContext(null)

export const EmitterProvider = ({ children, ...props }) => {
  const emitter = useEmitter()

  return (
    <EmitterContext.Provider value={emitter} {...props}>
      {children}
    </EmitterContext.Provider>
  )
}
