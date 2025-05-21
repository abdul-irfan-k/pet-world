import React from 'react';

import { cva } from 'class-variance-authority';

import { Textarea } from '../../textarea/Textarea';

import { Label } from './Label';

import { cn } from '@/lib/utils';

const textAreaVariants = cva(
  'flex w-full resize-none overflow-hidden rounded-lg border border-[1px] bg-white px-3.5 py-2.5 text-base text-brand-800 placeholder:text-brand-300 focus:outline-none disabled:cursor-not-allowed',
  {
    variants: {
      error: {
        true: 'border-error-500 focus:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(254,228,226,1)]',
        false:
          'border-brand-300 focus:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(244,235,255,1)]',
      },
      disabled: {
        true: 'border-gray-300 bg-gray-50 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]',
        false: '',
      },
    },
  },
);

export interface TextAreaFieldProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'disabled' | 'color'
  > {
  error?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    { error, label, disabled, className, containerClassName, ...props },
    ref,
  ) => {
    const hasError = error !== undefined && error.length > 0;
    const isDisabled = !!disabled;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label !== undefined && (
          <Label htmlFor={props.id || props.name}>{label}</Label>
        )}
        <Textarea
          ref={ref}
          className={cn(
            textAreaVariants({
              error: hasError,
              disabled: isDisabled,
            }),
            className,
          )}
          disabled={isDisabled}
          aria-invalid={hasError}
          {...props}
        />
        {error && <span className="text-error-500 text-sm">{error}</span>}
      </div>
    );
  },
);

TextAreaField.displayName = 'TextAreaField';
export { TextAreaField };
