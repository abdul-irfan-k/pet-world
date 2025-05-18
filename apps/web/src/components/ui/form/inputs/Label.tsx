'use client';

import * as React from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const labelVariants = cva('text-gray-700 text-sm font-medium leading-tight ');

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<'label'>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants(), className)} {...props}>
      {props.children}
    </label>
  ),
);
Label.displayName = 'Label';
export { Label };
