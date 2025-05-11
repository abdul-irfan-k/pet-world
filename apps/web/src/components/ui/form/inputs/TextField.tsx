import React from 'react';

import { cva } from 'class-variance-authority';

import { Input } from './Input';
import { Label } from './Label';

import { cn } from '@/lib/utils';

const textFieldVariants = cva(
  'flex items-center gap-2 overflow-hidden rounded-lg border border-[1px] bg-white px-3.5 py-2.5',
  {
    variants: {
      error: {
        true: 'border-error-500 focus-within:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus-within:shadow-[0px_0px_0px_4px_rgba(254,228,226,1)]',
        false:
          'border-brand-300 focus-within:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus-within:shadow-[0px_0px_0px_4px_rgba(244,235,255,1)]',
      },
      disabled: {
        true: 'border-gray-300 bg-gray-50 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]',
        false: '',
      },
    },
  },
);

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'color'
  > {
  error?: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, label, icon, disabled, className, ...props }, ref) => {
    const hasError = error !== undefined && error.length > 0;
    const isDisabled = !!disabled;

    return (
      <div className="flex flex-col gap-1.5">
        {label !== undefined && <Label>{label}</Label>}
        <div
          className={cn(
            textFieldVariants({
              error: hasError,
              disabled: isDisabled,
            }),
            className,
          )}
        >
          {icon}
          <Input
            ref={ref}
            className="flex-1 border-none bg-transparent outline-none focus:ring-0"
            type="text"
            disabled={isDisabled}
            aria-invalid={hasError}
            {...props}
          />
        </div>
      </div>
    );
  },
);

TextField.displayName = 'TextField';
export { TextField };
