import { Emitter, emitter } from './emitter'

import type { EventHandlerMap } from './types'

describe('emitter', () => {
  it('should export Emitter(class), emitter(function)', () => {
    const mitt = new Emitter()
    expect(typeof emitter).toBe('function')
    const mitt2 = emitter()

    expect(mitt).toBeInstanceOf(Emitter)
    expect(mitt2).toBeInstanceOf(Emitter)
    expect(mitt).not.toBe(mitt2)
  })

  it('should accept an optional event handler map', () => {
    expect(() => emitter(new Map())).not.toThrow()
    const map = new Map()
    const a = jest.fn()
    const b = jest.fn()
    map.set('foo', [a, b])

    type E = { foo: undefined }

    const events = emitter<E>(map)
    events.emit('foo')
    expect(a).toBeCalledTimes(1)
    expect(b).toBeCalledTimes(1)
  })
})

describe('mitt#', () => {
  const eventType = Symbol('eventType')
  type Events = {
    foo: unknown
    constructor: unknown
    FOO: unknown
    bar: unknown
    Bar: unknown
    'baz:bat!': unknown
    'baz:baT!': unknown
    Foo: unknown
    [eventType]: unknown
  }
  let events: EventHandlerMap<Events>, inst: Emitter<Events>

  beforeEach(() => {
    events = new Map()
    inst = emitter(events)
  })

  describe('properties', () => {
    it('should expose the event handler map', () => {
      expect(inst).toHaveProperty('__all')
    })
  })

  describe('on()', () => {
    it('should be a function', () => {
      expect(typeof inst.on).toBe('function')
    })

    it('should register handler for new type', () => {
      const foo = () => {}
      inst.on('foo', foo)

      expect(events.get('foo')).toEqual([foo])
    })

    it('should register handlers for any type strings', () => {
      const foo = () => {}
      inst.on('constructor', foo)

      expect(events.get('constructor')).toEqual([foo])
    })

    it('should append handler for existing type', () => {
      const foo = () => {}
      const bar = () => {}
      inst.on('foo', foo)
      inst.on('foo', bar)

      expect(events.get('foo')).toEqual([foo, bar])
    })

    it('should NOT normalize case', () => {
      const foo = () => {}
      inst.on('FOO', foo)
      inst.on('Bar', foo)
      inst.on('baz:baT!', foo)

      expect(events.get('FOO')).toEqual([foo])
      expect(events.has('foo')).toBe(false)
      expect(events.get('Bar')).toEqual([foo])
      expect(events.has('bar')).toBe(false)
      expect(events.get('baz:baT!')).toEqual([foo])
    })

    it('can take symbols for event types', () => {
      const foo = () => {}
      inst.on(eventType, foo)
      expect(events.get(eventType)).toEqual([foo])
    })

    // Adding the same listener multiple times should register it multiple times.
    // See https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    it('should add duplicate listeners', () => {
      const foo = () => {}
      inst.on('foo', foo)
      inst.on('foo', foo)
      expect(events.get('foo')).toEqual([foo, foo])
    })
  })

  describe('off()', () => {
    it('should be a function', () => {
      expect(inst).toHaveProperty('off')
    })

    it('should remove handler for type', () => {
      const foo = () => {}
      inst.on('foo', foo)
      inst.off('foo', foo)

      expect(events.get('foo')).toHaveLength(0)
    })

    it('should NOT normalize case', () => {
      const foo = () => {}
      inst.on('FOO', foo)
      inst.on('Bar', foo)
      inst.on('baz:bat!', foo)

      inst.off('FOO', foo)
      inst.off('Bar', foo)
      inst.off('baz:baT!', foo)

      expect(events.get('FOO')).toHaveLength(0)
      expect(events.has('foo')).toBe(false)
      expect(events.get('Bar')).toHaveLength(0)
      expect(events.has('bar')).toBe(false)
      // expect(events.get('baz:bat!')).to.have.lengthOf(1)
    })

    it('should remove only the first matching listener', () => {
      const foo = () => {}
      inst.on('foo', foo)
      inst.on('foo', foo)
      inst.off('foo', foo)
      expect(events.get('foo')).toEqual([foo])
      inst.off('foo', foo)
      expect(events.get('foo')).toEqual([])
    })

    it('off("type") should remove all handlers of the given type', () => {
      inst.on('foo', () => {})
      inst.on('foo', () => {})
      inst.on('bar', () => {})
      inst.off('foo')
      expect(events.get('foo')).toEqual([])
      expect(events.get('bar')).toHaveLength(1)
      inst.off('bar')
      expect(events.get('bar')).toEqual([])
    })
  })

  describe('emit()', () => {
    it('should be a function', () => {
      expect(inst).toHaveProperty('emit')
    })

    it('should invoke handler for type', () => {
      const event = { a: 'b' }

      inst.on('foo', (one: any, two?: unknown) => {
        expect(one).toEqual(event)
        expect(two).toBeUndefined()
      })

      inst.emit('foo', event)
    })

    it('should NOT ignore case', () => {
      const onFoo = jest.fn();
        const onFOO = jest.fn()
      events.set('Foo', [onFoo])
      events.set('FOO', [onFOO])

      inst.emit('Foo', 'Foo arg')
      inst.emit('FOO', 'FOO arg')

      expect(onFoo).toBeCalledWith('Foo arg')
      expect(onFOO).toBeCalledWith('FOO arg')
    })

    it('should invoke * handlers', () => {
      const star = jest.fn();
        const ea = { a: 'a' };
        const eb = { b: 'b' }

      events.set('*', [star])

      inst.emit('foo', ea)
      expect(star).toBeCalledWith('foo', ea)

      inst.emit('bar', eb)
      expect(star).toBeCalledWith('bar', eb)
    })
  })
})
