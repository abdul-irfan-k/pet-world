import React from 'react';
import { Input } from './Input';

const EmailInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      type="email"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="off"
      inputMode="email"
    />
  );
});

EmailInput.displayName = 'EmailInput';
export { EmailInput };
