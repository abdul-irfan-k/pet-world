import nodemailer from 'nodemailer';

import { GMAIL_APP_PASSWORD, GMAIL_USER } from './env.config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});
