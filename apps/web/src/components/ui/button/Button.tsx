import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { Spinner } from '../spinnner';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600 text-white hover:bg-brand-700 focus:bg-brand-600 disabled:bg-brand-200 disabled:text-white',
        destructive:
          'bg-error-600 text-white hover:bg-error-700 focus:bg-error-600 disabled:bg-error-200 disabled:text-white',
        outline:
          'bg-background text-gray-700 border border-gray-300 border hover:bg-accent hover:text-accent-foreground disabled:border-gray-200 disabled:text-gray-300',
        secondary:
          'bg-brand-50 text-brand-700 border border-brand-50 border-[1px] hover:bg-brand-100 hover:border-brand-100 focus:bg-brand-50 disabled:bg-brand-25 disabled:text-brand-300 disabled:border-brand-25',
        ghost: 'hover:bg-brand-50 hover:text-brand-700',
        link: 'text-brand-700 underline-offset-4 hover:underline',

        black: 'bg-black text-white hover:bg-black/90 focus:bg-black/90 disabled:bg-gray-200 disabled:text-white',
      },
      size: {
        default: 'h-10 px-4 py-2.5',
        sm: 'h-9 rounded-lg px-3.5 py-2',
        lg: 'h-11 rounded-md px-[18px] py-2.5',
        xl: 'text-[16px] leading-[24px] rounded-md px-4 py-5',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      rounded: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, asChild = false, children, isLoading = false, rounded = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))} ref={ref} {...props}>
        {isLoading && <Spinner />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
