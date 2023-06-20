/**
 * @jest-environment jsdom
 */
import { Remember, remember } from './remember'

const storageMock = (() => {
  let store: any = {}
  return {
    clear() {
      store = {}
    },
    getItem(key: string) {
      return store[key]
    },
    removeItem(key: string) {
      delete store[key]
    },
    setItem(key: string, value: any) {
      store[key] = value.toString()
    },
  }
})()
Object.defineProperty(window, 'localStorage', {
  value: storageMock,
})
Object.defineProperty(window, 'sessionStorage', {
  value: storageMock,
})

describe('remember', () => {
  it('should export Remember(class), remember(function)', () => {
    const reme = new Remember('name1')
    expect(typeof remember).toBe('function')
    const reme2 = remember('name2')

    expect(reme).toBeInstanceOf(Remember)
    expect(reme2).toBeInstanceOf(Remember)
    expect(reme).not.toBe(reme2)
  })
})

describe('adapter: Session', () => {
  it('should support default storage', () => {
    expect(() => remember('test-session')).not.toThrow()

    const reme = remember<number>('test-session')
    reme.set({ a: 2, b: 3 })
    expect(reme.get()).toEqual({ a: 2, b: 3 })

    reme.set('a', 1)
    reme.set('b', 2)
    reme.set('c', 3)
    reme.set('d', 4)
    expect(reme.get()).toEqual({ a: 1, b: 2, c: 3, d: 4 })

    reme.remove(['a', 'c'])
    expect(reme.get()).toEqual({ b: 2, d: 4 })

    reme.remove('b')
    expect(reme.get()).toEqual({ d: 4 })

    reme.clear()
    expect(reme.get()).toEqual(null)
  })
})
