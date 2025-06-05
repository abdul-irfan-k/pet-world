import React from 'react';

import { useRouter } from 'next/navigation';

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'sonner';

import { useSignInWithGoogleMutation } from '@/lib/api/authApi';
import { useAuthStore } from '@/stores/authStore';

const GoogleAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const router = useRouter();
  const { login } = useAuthStore();

  const { mutate } = useSignInWithGoogleMutation({
    onSuccess: (response: any) => {
      const { data } = response;
      login(data.user);
      toast.success('Sign in successful', {
        description: 'Welcome back to our platform!',
        duration: 3000,
      });
      const token = data.accessToken;
      document.cookie = `accessToken=${token}; path=/; Secure; SameSite=None`;
      router.push('/');
    },
    onError: () => {
      toast.error('Google sign in failed');
    },
  });

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          const { credential } = credentialResponse;
          if (credential) {
            mutate({ idToken: credential });
          }
        }}
        onError={() => {
          toast.error('Google sign in failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};
export { GoogleAuth };
