import { forwardRef } from 'react'

import { useButton } from './use-button'

import type { UseButtonProps } from './use-button'

export interface ButtonProps extends UseButtonProps {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { Component, children, domRef, getButtonProps, styles } = useButton({
    ref,
    ...props,
  })

  return (
    <Component className={styles} ref={domRef} {...getButtonProps()}>
      {children}
    </Component>
  )
})
Button.displayName = 'Button'
