export const getPasswordChangeTemplate = (otp: string) => {
  return `
        <h1>Password Reset OTP</h1>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>Use this OTP to reset your password. Do not share it with anyone.</p>
        <br />
        <p>If you did not request a password reset, you can ignore this email.</p>
        <p>~ Inker</p>
    `;
};

export const getVerifyEmailTemplate = (otp: string, verificationUrl: string) => {
  return `
      <div style="font-family: sans-serif; color: #333;">
      <h1>Verify Your Email</h1>
      <p style="font-size: 28px; font-weight: bold; margin-bottom: 16px;">${otp}</p>
      <p>Click the button below to verify your email:</p>
      <a href="${verificationUrl}" target="_blank" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4F46E5;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin: 16px 0;
      ">
      Verify Email
      </a>
      <br /><br />
      <p>This link contains your OTP and will expire shortly. Do not share it with anyone.</p>
      <p>If you did not request this verification, you can ignore this email.</p>
      <p style="margin-top: 32px;">~ Inker</p>
      </div>
  `;
};
