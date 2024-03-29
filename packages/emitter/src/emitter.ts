import type {
  EventHandlerList,
  EventHandlerMap,
  EventType,
  GenericEventHandler,
  WildCardEventHandlerList,
} from './types'

/**
 * forken from https://github.com/developit/mitt
 */
export class Emitter<Events extends Record<EventType, unknown>> {
  private __all: EventHandlerMap<Events>

  constructor(all?: EventHandlerMap<Events>) {
    this.__all = all || new Map()
  }

  /**
   * Invoke all handlers for the given type.
   * If present, `'*'` handlers are invoked after type-matched handlers.
   *
   * Note: Manually firing '*' handlers is not supported.
   *
   * @param {string|symbol} type The event type to invoke
   * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
   * @memberOf emitter
   */
  public emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
    let handlers = this.__all.get(type)
    if (handlers) {
      for (const handler of handlers as EventHandlerList<Events[keyof Events]>) {
        handler(evt!)
      }
    }

    handlers = this.__all.get('*')
    if (handlers) {
      for (const handler of handlers as WildCardEventHandlerList<Events>) {
        handler(type, evt!)
      }
    }
  }

  /**
   * Remove an event handler for the given type.
   * If `handler` is omitted, all handlers of the given type are removed.
   * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
   * @param {Function} [handler] Handler function to remove
   * @memberOf emitter
   */
  public off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler<Events>) {
    const handlers: Array<GenericEventHandler<Events>> | undefined = this.__all.get(type)
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      } else {
        this.__all.set(type, [])
      }
    }
  }

  /**
   * Register an event handler for the given type.
   * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
   * @param {Function} handler Function to call in response to given event
   * @memberOf emitter
   */
  public on<Key extends keyof Events>(type: Key, handler: GenericEventHandler<Events>) {
    const handlers: Array<GenericEventHandler<Events>> | undefined = this.__all.get(type)
    if (handlers) {
      handlers.push(handler)
    } else {
      this.__all.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
    }
  }
}

export function emitter<Events extends Record<EventType, unknown>>(all?: EventHandlerMap<Events>): Emitter<Events> {
  return new Emitter(all)
}
