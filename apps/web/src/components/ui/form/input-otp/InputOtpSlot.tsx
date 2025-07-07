'use client';
import React from 'react';

import { cva } from 'class-variance-authority';
import { OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';

const inputOtpSlotVariants = cva(
  'w-20 h-20 bg-white rounded-lg flex flex-col text-medium text-5xl leading-[60px] justify-center items-center border-[1px] gap-2.5 disabled:cursor-not-allowed ',
  {
    variants: {
      state: {
        empty: 'text-gray-300 border-gray-300',
        filled: 'text-brand-600 border-brand-300',
        active: 'text-brand-600 border-brand-600 hadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]',
      },
    },
  },
);
const InputOTPSlot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & { index: number }>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    const inputState = isActive ? 'active' : char ? 'filled' : 'empty';

    return (
      <div ref={ref} className={cn(inputOtpSlotVariants({ state: inputState }), className)} {...props}>
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = 'InputOTPSlot';
export { InputOTPSlot };
