import React from 'react';

import { TextField, TextFieldProps } from './TextField';

const EmailField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        {...props}
        ref={ref}
        type="email"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        inputMode="email"
      />
    );
  },
);

EmailField.displayName = 'EmailField';
export { EmailField };
