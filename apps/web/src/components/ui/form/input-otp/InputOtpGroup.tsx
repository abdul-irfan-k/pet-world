import { cn } from '@/lib/utils';
import React from 'react';

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2', className)}
    {...props}
  />
));
InputOTPGroup.displayName = 'InputOTPGroup';

export { InputOTPGroup };
