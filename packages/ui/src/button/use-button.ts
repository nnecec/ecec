import { useCallback, useMemo } from 'react'
import { Slot } from '@radix-ui/react-slot'

import type { MouseEventHandler, Ref } from 'react'
import type React from 'react'

import { button } from '../theme'

import type { ButtonVariantProps } from '../theme'

export interface UseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariantProps {
  asChild?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  ref?: Ref<HTMLButtonElement>
}

export function useButton(props: UseButtonProps) {
  const {
    asChild,
    children,
    className,
    color = 'default',
    disabled = false,
    loading = false,
    ref,
    size = 'md',
    style,
    variant = 'solid',
    ...otherProps
  } = props

  const Component = asChild ? Slot : 'button'

  const domRef = ref

  const styles = useMemo(
    () =>
      button({
        className,
        color,
        disabled,
        loading,
        size,
        variant,
      }),
    [size, color, variant, disabled, loading, className],
  )

  const getButtonProps = useCallback(
    (props: any = {}) => ({
      'data-disabled': disabled,
      'data-loading': loading,
      otherProps,
      props,
      style: {
        ...style,
        // eslint-disable-next-line unicorn/consistent-destructuring
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
    getButtonProps,
    styles,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
