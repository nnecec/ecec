import { useCallback, useMemo } from 'react'
import { Slot } from '@radix-ui/react-slot'

import type { MouseEventHandler, Ref } from 'react'
import type React from 'react'

import { button } from '../theme'

import type { ButtonVariantProps } from '../theme'

export interface UseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariantProps {
  ref?: Ref<HTMLButtonElement>
  onClick?: MouseEventHandler<HTMLButtonElement>
  asChild?: boolean
}

export function useButton(props: UseButtonProps) {
  const {
    ref,
    asChild,
    children,
    className,
    size = 'md',
    color = 'default',
    variant = 'solid',
    radius = 'md',
    disabled = false,
    loading = false,
    onClick,
    style,
    ...otherProps
  } = props

  const Component = asChild ? Slot : 'button'

  const domRef = ref

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        disabled,
        loading,
        className,
      }),
    [size, color, variant, disabled, loading, className],
  )

  const getButtonProps = useCallback(
    (props = {}) => ({
      'data-disabled': disabled,
      'data-loading': loading,
      otherProps,
      props,
      style: {
        ...style,
        ...props?.style,
        WebkitTapHighlightColor: 'transparent',
      },
    }),
    [disabled, loading, otherProps, style],
  )

  return {
    Component,
    children,
    domRef,
    styles,
    getButtonProps,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
