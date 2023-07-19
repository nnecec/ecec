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
  compoundVariants: [
    // solid / color
    {
      class: solid.default,
      color: 'default',
      variant: 'solid',
    },
    {
      class: solid.primary,
      color: 'primary',
      variant: 'solid',
    },
    {
      class: solid.secondary,
      color: 'secondary',
      variant: 'solid',
    },
    {
      class: solid.success,
      color: 'success',
      variant: 'solid',
    },
    {
      class: solid.warning,
      color: 'warning',
      variant: 'solid',
    },
    {
      class: solid.danger,
      color: 'danger',
      variant: 'solid',
    },
    // bordered / color
    {
      class: bordered.default,
      color: 'default',
      variant: 'bordered',
    },
    {
      class: bordered.primary,
      color: 'primary',
      variant: 'bordered',
    },
    {
      class: bordered.secondary,
      color: 'secondary',
      variant: 'bordered',
    },
    {
      class: bordered.success,
      color: 'success',
      variant: 'bordered',
    },
    {
      class: bordered.warning,
      color: 'warning',
      variant: 'bordered',
    },
    {
      class: bordered.danger,
      color: 'danger',
      variant: 'bordered',
    },
    // flat / color
    {
      class: flat.default,
      color: 'default',
      variant: 'flat',
    },
    {
      class: flat.primary,
      color: 'primary',
      variant: 'flat',
    },
    {
      class: flat.secondary,
      color: 'secondary',
      variant: 'flat',
    },
    {
      class: flat.success,
      color: 'success',
      variant: 'flat',
    },
    {
      class: flat.warning,
      color: 'warning',
      variant: 'flat',
    },
    {
      class: flat.danger,
      color: 'danger',
      variant: 'flat',
    },
    // ghost / color
    {
      class: ghost.default,
      color: 'default',
      variant: 'ghost',
    },
    {
      class: ghost.primary,
      color: 'primary',
      variant: 'ghost',
    },
    {
      class: ghost.secondary,
      color: 'secondary',
      variant: 'ghost',
    },
    {
      class: ghost.success,
      color: 'success',
      variant: 'ghost',
    },
    {
      class: ghost.warning,
      color: 'warning',
      variant: 'ghost',
    },
    {
      class: ghost.danger,
      color: 'danger',
      variant: 'ghost',
    },
    {
      class: 'transition-[transform,background]',
      variant: 'ghost',
    },
    // isInGroup / radius
    {
      class: 'rounded-none  first:rounded-l last:rounded-r',
      isInGroup: true,
      radius: 'base',
    },
    {
      class: 'rounded-none  first:rounded-l-sm last:rounded-r-sm',
      isInGroup: true,
      radius: 'sm',
    },
    {
      class: 'rounded-none  first:rounded-l-md last:rounded-r-md',
      isInGroup: true,
      radius: 'md',
    },
    {
      class: 'rounded-none  first:rounded-l-lg last:rounded-r-lg',
      isInGroup: true,
      radius: 'lg',
    },
    {
      class: 'rounded-none  first:rounded-l-xl last:rounded-r-xl',
      isInGroup: true,
      radius: 'xl',
    },
    {
      class: 'rounded-none  first:rounded-l-2xl last:rounded-r-2xl',
      isInGroup: true,
      radius: '2xl',
    },
    {
      class: 'rounded-none  first:rounded-l-3xl last:rounded-r-3xl',
      isInGroup: true,
      radius: '3xl',
    },
    {
      class: 'rounded-none  first:rounded-l-full last:rounded-r-full',
      isInGroup: true,
      radius: 'full',
    },
    // isInGroup / bordered / ghost
    {
      class: '[&:not(:first-child)]:border-l-0',
      isInGroup: true,
      variant: ['bordered', 'ghost'],
    },
  ],
  defaultVariants: {
    color: 'default',
    disabled: false,
    fullWidth: false,
    loading: false,
    radius: 'xl',
    size: 'md',
    variant: 'solid',
  },
  variants: {
    color: {
      danger: '',
      default: '',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
    },
    disabled: {
      true: 'pointer-events-none opacity-50',
    },
    fullWidth: {
      true: 'w-full',
    },
    isInGroup: {
      true: '[&:not(:first-child):not(:last-child)]:rounded-none',
    },
    loading: {
      true: 'pointer-events-none opacity-50',
    },
    radius: {
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      base: 'rounded',
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      none: 'rounded-none',
      sm: 'rounded-sm',
      xl: 'rounded-xl',
    },
    size: {
      lg: 'h-12 min-w-[8rem] gap-3 px-6 text-base',
      md: 'h-10 min-w-[7rem] gap-2 px-4 text-sm',
      sm: 'h-8 min-w-[6rem] gap-2 px-3 text-sm',
      xl: 'h-14 min-w-[10rem] gap-3 px-8 text-lg',
      xs: 'h-6 min-w-[5rem] gap-1 px-2 text-xs',
    },
    variant: {
      bordered: 'border-2 bg-transparent',
      flat: '',
      ghost: 'bg-transparent',
      solid: '',
    },
  },
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
  defaultVariants: {
    fullWidth: false,
  },
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
})

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>
export type ButtonVariantProps = VariantProps<typeof button>
