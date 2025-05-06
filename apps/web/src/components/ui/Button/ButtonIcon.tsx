import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonIconVariants = cva(
  'inline-flex items-center justify-center  rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-600  hover:bg-brand-700 focus:bg-brand-600 disabled:bg-brand-200',
        destructive:
          'bg-error-600  hover:bg-error-700 focus:bg-error-600 disabled:bg-error-200',
        outline:
          'bg-background text-gray-700 border border-gray-300 border-[1px] hover:bg-accent hover:text-accent-foreground disabled:border-gray-200 disabled:text-gray-300',
        secondary:
          'bg-brand-50 text-brand-700 border border-brand-50 border-[1px] hover:bg-brand-100 hover:border-brand-100 focus:bg-brand-50 disabled:bg-brand-25 disabled:text-brand-300 disabled:border-brand-25',
        ghost: 'hover:bg-brand-50 hover:text-brand-700',
      },
      size: {
        sm: ' p-2',
        md: ' p2.5',
        lg: 'p-3',
        xl: 'p-3.5',
        '2xl': 'p-4',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonIconVariants> {
  asChild?: boolean;
}

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonIconVariants({ variant, size, className, fullWidth }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';

export { ButtonIcon, buttonIconVariants };
