import { transporter, GMAIL_USER } from '../config';

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
