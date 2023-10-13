'use client'

import { useRef, useState } from 'react'
import { useIsomorphicEffect } from '@mantine/hooks'

import { getDefaultContainer, getScroll, scrollTo, throttle } from './utils'

function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (element.getClientRects().length === 0) {
    return 0
  }
  const rect = element.getBoundingClientRect()
  if (rect.width || rect.height) {
    if (container === window) {
      container = element.ownerDocument!.documentElement!
      return rect.top - container.clientTop
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top
  }

  return rect.top
}

interface Item {
  id: string
  title: string
}

interface AnchorProps {
  getContainer?: () => HTMLElement
  items?: Item[]
  offsetTop?: number
}

export const useAnchor: AnchorProps = ({ getContainer, items = [], offsetTop = 0 }: AnchorProps) => {
  const [currentLink, setCurrentLink] = useState('')
  const animating = useRef(false)
  const getCurrentContainer = getContainer ?? getDefaultContainer

  const getCurrentAnchor = (): Item => {
    const container = getCurrentContainer()

    const passedLinks: Item[] = []

    for (const item of items) {
      const target = document.getElementById(item.id)
      if (target) {
        const top = getOffsetTop(target, container)
        if (top < offsetTop) {
          passedLinks.push(item)
        }
      }
    }
    return passedLinks.at(-1) ?? items[0]
  }

  function handleScroll() {
    if (animating.current) {
      return
    }

    const currentAnchor = getCurrentAnchor()

    currentAnchor && setCurrentLink(currentAnchor.id)
  }

  function handleScrollTo(id: string) {
    setCurrentLink(id)
    const target = document.getElementById(id)
    if (!target) return

    const container = getCurrentContainer()
    const scrollTop = getScroll(container, true)
    const targetOffsetTop = getOffsetTop(target, container)
    const y = scrollTop + targetOffsetTop - offsetTop
    animating.current = true
    scrollTo(y, {
      callback() {
        animating.current = false
      },
      getContainer: getCurrentContainer,
    })
  }

  useIsomorphicEffect(() => {
    const scrollContainer = getCurrentContainer()
    handleScroll()

    const onScroll = throttle(handleScroll, 200)

    scrollContainer?.addEventListener('scroll', onScroll)
    return () => {
      scrollContainer?.removeEventListener('scroll', onScroll)
    }
  }, [])

  const anchorProps = {
    activeKey: currentLink,
    onChange: handleScrollTo,
  }

  return {
    anchorLinks: items,
    anchorProps,
  }
}
