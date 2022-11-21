import { useMemo } from 'react'
import { createLocationStorage, remember } from '@afojs/remember'
import { atom } from 'jotai'

import { useStore } from './core'
import { Params } from './types'

export const useSearch = (namespace = 'afo/search') => {
  const reme = useMemo(() => remember(namespace, createLocationStorage()), [namespace])

  const searchAtom = useMemo(() => {
    const originAtom = atom(reme.get() ?? {})

    return atom<Params, Params>(
      (get) => get(originAtom),
      (_, set, update) => {
        set(originAtom, update)

        reme.set(update)
      }
    )
  }, [reme])

  const store = useStore(searchAtom)

  return store
}
