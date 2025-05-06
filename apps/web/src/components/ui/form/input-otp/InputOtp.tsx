'use client';

import * as React from 'react';
import { OTPInput } from 'input-otp';

import { cn } from '@/lib/utils';

const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
));
InputOTP.displayName = 'InputOTP';

export { InputOTP };
