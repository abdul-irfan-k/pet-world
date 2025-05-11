import React from 'react';

import { Input } from './Input';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>((props, ref) => {
  return <Input {...props} ref={ref} type="password" autoCapitalize="none" />;
});

PasswordInput.displayName = 'PasswordInput';
export { PasswordInput };
