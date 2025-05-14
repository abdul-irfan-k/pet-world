import validate from 'deep-email-validator';

import { NODE_ENV } from '@/config';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  if (NODE_ENV === 'development') return true;
  const { valid } = await validate({ email });
  return valid;
};
