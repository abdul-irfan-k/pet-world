import React from 'react';
import { TextField, TextFieldProps } from './TextField';

const PasswordField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField {...props} ref={ref} type="password" autoCapitalize="none" />
    );
  },
);

PasswordField.displayName = 'PasswordField';
export { PasswordField };
