const sanitize = (input: string): string => {
  return input.toLowerCase().replace(/[^a-z0-9]/g, '');
};

interface GenerateUsernameOptions {
  name?: string;
  email?: string;
  providerId?: string;
}
export const generateUsername = (data: GenerateUsernameOptions): string => {
  if (data.name) return sanitize(data.name);
  if (data.email) return sanitize(data.email.split('@')[0]);
  if (data.providerId) return `user_${data.providerId.slice(-6)}`;
  return 'user' + Math.random().toString(36).substring(2, 5);
};
