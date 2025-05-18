import nodemailer from 'nodemailer';

import { GMAIL_USER, GMAIL_APP_PASSWORD } from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'host', 'port', etc. for custom SMTP
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD, // use app password, not your main password
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};
