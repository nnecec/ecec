export function isWindow(obj: any): obj is Window {
  return obj !== null && obj !== undefined && obj === obj.window
}

export function getDefaultContainer() {
  return window
}

export function getScroll(target: Document | HTMLElement | Window | null, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0
  }
  const method = top ? 'scrollTop' : 'scrollLeft'
  let result = 0
  if (isWindow(target)) {
    result = target[top ? 'pageYOffset' : 'pageXOffset']
  } else if (target instanceof Document) {
    result = target.documentElement[method]
  } else if (target instanceof HTMLElement) {
    result = target[method]
  } else if (target) {
    // According to the type inference, the `target` is `never` type.
    // Since we configured the loose mode type checking, and supports mocking the target with such shape below::
    //    `{ documentElement: { scrollLeft: 200, scrollTop: 400 } }`,
    //    the program may falls into this branch.
    // Check the corresponding tests for details. Don't sure what is the real scenario this happens.
    result = target[method]
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = (target.ownerDocument ?? target).documentElement?.[method]
  }
  return result
}

export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  }

  return (cc / 2) * ((t -= 2) * t * t + 2) + b
}

interface ScrollToOptions {
  /** Scroll end callback */
  callback?: () => void
  /** Animation duration, default as 450 */
  duration?: number
  /** Scroll container, default as window */
  getContainer?: () => Document | HTMLElement | Window
}

export function scrollTo(y: number, options: ScrollToOptions = {}) {
  if (typeof window === 'undefined') {
    return
  }
  const { callback, duration = 450, getContainer = () => window } = options
  const container = getContainer()
  const scrollTop = getScroll(container, true)
  const startTime = Date.now()

  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration)
    if (isWindow(container)) {
      ;(container as Window).scrollTo(window.pageXOffset, nextScrollTop)
    } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
      ;(container as Document).documentElement.scrollTop = nextScrollTop
    } else {
      ;(container as HTMLElement).scrollTop = nextScrollTop
    }
    if (time < duration) {
      window.requestAnimationFrame(frameFunc)
    } else if (typeof callback === 'function') {
      callback()
    }
  }
  window.requestAnimationFrame(frameFunc)
}

export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Checks if there is any invocation throttled
   */
  isThrottled(): boolean
}

export const throttle = <TArgs extends any[]>(func: (...args: TArgs) => any, interval: number) => {
  let ready = true
  let timer: any | undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    if (!ready) return
    func(...args)
    ready = false
    timer = setTimeout(() => {
      ready = true
      timer = undefined
    }, interval)
  }
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
}
