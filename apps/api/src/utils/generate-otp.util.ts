import crypto from 'crypto';

export const generateOTP = (length: number = 6) => {
  const otp = crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length));
  return otp.toString();
};
