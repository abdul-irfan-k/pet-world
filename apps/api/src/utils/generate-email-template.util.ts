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

export const getVerifyEmailTemplate = (verificationUrl: string) => {
  return `
        <h1>Verify Your Email</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
        <br /><br />
        <p>This link contains your OTP and will expire shortly. Do not share it with anyone.</p>
        <p>If you did not request this verification, you can ignore this email.</p>
        <p>~ Inker</p>
    `;
};
