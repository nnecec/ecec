import { button, ButtonVariantProps } from '@afojs/theme'
import { Slot } from '@radix-ui/react-slot'
import { MouseEventHandler, Ref, useMemo } from 'react'

export interface UseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  ButtonVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: Ref<HTMLButtonElement | null>
  /**
   * Button click event handler.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>

  asChild?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'solid' | 'outline' | 'ghost'
  radius?: 'xs'| 'sm' | 'md' | 'lg' | 'xl'
}

export function useButton(props: UseButtonProps) {

  const {
    ref,
    asChild,
    children,
    className,
    size = 'md',
    color =  'default',
    variant = 'solid',
    radius = 'md',
    disabled =  false,
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

  const getButtonProps: PropGetter = useCallback(
    (props = {}) => ({
      'data-disabled': dataAttr(isDisabled),
      'data-focus': dataAttr(isFocused),
      'data-pressed': dataAttr(isPressed),
      'data-focus-visible': dataAttr(isFocusVisible),
      'data-hover': dataAttr(isHovered),
      'data-loading': dataAttr(isLoading),
      ...mergeProps(ariaButtonProps, focusProps, hoverProps, otherProps, props),
      style: {
        ...style,
        ...props?.style,
        WebkitTapHighlightColor: 'transparent',
      },
    }),
    [
      style,
      loading,
      disabled,
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
