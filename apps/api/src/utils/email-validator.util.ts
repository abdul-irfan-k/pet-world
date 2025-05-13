import validate from 'deep-email-validator';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const { valid } = await validate({ email });
  return valid;
};
