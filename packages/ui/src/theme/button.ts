/* eslint-disable tailwindcss/no-custom-classname */
import { tv } from 'tailwind-variants'

import type { VariantProps } from 'tailwind-variants'

import { bordered, flat, ghost, solid } from './variants'

/**
 * Button wrapper **Tailwind Variants** component
 *
 * const classNames = button({...})
 *
 * @example
 * <button
 *  className={classNames())}
 *  data-pressed={true/false}
 *  data-hover={true/false}
 *  data-focus={true/false}
 *  data-focus-visible={true/false}
 * >
 *   Button
 * </button>
 */
export const button = tv({
  base: [
    'z-0',
    'group',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'box-border',
    'appearance-none',
    'outline-none',
    'select-none',
    'font-normal',
    'subpixel-antialiased',
    'data-[pressed=true]:scale-95',
    'overflow-hidden',
    // focus ring
    'data-[focus-visible=true]:outline-none',
    'data-[focus-visible=true]:ring-2',
    'data-[focus-visible=true]:ring-primary',
    'data-[focus-visible=true]:ring-offset-2',
    'data-[focus-visible=true]:ring-offset-background',
    'data-[focus-visible=true]:dark:ring-offset-background-dark',
  ],
  variants: {
    variant: {
      solid: '',
      bordered: 'border-2 bg-transparent',
      flat: '',
      ghost: 'bg-transparent',
    },
    size: {
      xs: 'h-6 min-w-[5rem] gap-1 px-2 text-xs',
      sm: 'h-8 min-w-[6rem] gap-2 px-3 text-sm',
      md: 'h-10 min-w-[7rem] gap-2 px-4 text-sm',
      lg: 'h-12 min-w-[8rem] gap-3 px-6 text-base',
      xl: 'h-14 min-w-[10rem] gap-3 px-8 text-lg',
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      danger: '',
    },
    radius: {
      none: 'rounded-none',
      base: 'rounded',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'pointer-events-none opacity-50',
    },
    loading: {
      true: 'pointer-events-none opacity-50',
    },
    isInGroup: {
      true: '[&:not(:first-child):not(:last-child)]:rounded-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'default',
    radius: 'xl',
    fullWidth: false,
    disabled: false,
    loading: false,
  },
  compoundVariants: [
    // solid / color
    {
      variant: 'solid',
      color: 'default',
      class: solid.default,
    },
    {
      variant: 'solid',
      color: 'primary',
      class: solid.primary,
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: solid.secondary,
    },
    {
      variant: 'solid',
      color: 'success',
      class: solid.success,
    },
    {
      variant: 'solid',
      color: 'warning',
      class: solid.warning,
    },
    {
      variant: 'solid',
      color: 'danger',
      class: solid.danger,
    },
    // bordered / color
    {
      variant: 'bordered',
      color: 'default',
      class: bordered.default,
    },
    {
      variant: 'bordered',
      color: 'primary',
      class: bordered.primary,
    },
    {
      variant: 'bordered',
      color: 'secondary',
      class: bordered.secondary,
    },
    {
      variant: 'bordered',
      color: 'success',
      class: bordered.success,
    },
    {
      variant: 'bordered',
      color: 'warning',
      class: bordered.warning,
    },
    {
      variant: 'bordered',
      color: 'danger',
      class: bordered.danger,
    },
    // flat / color
    {
      variant: 'flat',
      color: 'default',
      class: flat.default,
    },
    {
      variant: 'flat',
      color: 'primary',
      class: flat.primary,
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: flat.secondary,
    },
    {
      variant: 'flat',
      color: 'success',
      class: flat.success,
    },
    {
      variant: 'flat',
      color: 'warning',
      class: flat.warning,
    },
    {
      variant: 'flat',
      color: 'danger',
      class: flat.danger,
    },
    // ghost / color
    {
      variant: 'ghost',
      color: 'default',
      class: ghost.default,
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: ghost.primary,
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: ghost.secondary,
    },
    {
      variant: 'ghost',
      color: 'success',
      class: ghost.success,
    },
    {
      variant: 'ghost',
      color: 'warning',
      class: ghost.warning,
    },
    {
      variant: 'ghost',
      color: 'danger',
      class: ghost.danger,
    },
    {
      variant: 'ghost',
      class: 'transition-[transform,background]',
    },
    // isInGroup / radius
    {
      isInGroup: true,
      radius: 'base',
      class: 'rounded-none  first:rounded-l last:rounded-r',
    },
    {
      isInGroup: true,
      radius: 'sm',
      class: 'rounded-none  first:rounded-l-sm last:rounded-r-sm',
    },
    {
      isInGroup: true,
      radius: 'md',
      class: 'rounded-none  first:rounded-l-md last:rounded-r-md',
    },
    {
      isInGroup: true,
      radius: 'lg',
      class: 'rounded-none  first:rounded-l-lg last:rounded-r-lg',
    },
    {
      isInGroup: true,
      radius: 'xl',
      class: 'rounded-none  first:rounded-l-xl last:rounded-r-xl',
    },
    {
      isInGroup: true,
      radius: '2xl',
      class: 'rounded-none  first:rounded-l-2xl last:rounded-r-2xl',
    },
    {
      isInGroup: true,
      radius: '3xl',
      class: 'rounded-none  first:rounded-l-3xl last:rounded-r-3xl',
    },
    {
      isInGroup: true,
      radius: 'full',
      class: 'rounded-none  first:rounded-l-full last:rounded-r-full',
    },
    // isInGroup / bordered / ghost
    {
      isInGroup: true,
      variant: ['bordered', 'ghost'],
      class: '[&:not(:first-child)]:border-l-0',
    },
  ],
})

// size: {
//   xs: "px-2 h-6 text-xs",
//   sm: "px-3 h-8 text-sm",
//   md: "px-4 h-10 text-base",
//   lg: "px-6 h-12 text-base",
//   xl: "px-8 h-14 text-lg",
// },

/**
 * ButtonGroup wrapper **Tailwind Variants** component
 *
 * const classNames = buttonGroup({...})
 *
 * @example
 * <div role="group" className={classNames())}>
 *   // button elements
 * </div>
 */
export const buttonGroup = tv({
  base: 'inline-flex h-auto items-center justify-center',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
})

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>
export type ButtonVariantProps = VariantProps<typeof button>
