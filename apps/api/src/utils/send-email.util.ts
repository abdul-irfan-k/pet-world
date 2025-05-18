import { transporter, GMAIL_USER } from '../config';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: GMAIL_USER,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};
