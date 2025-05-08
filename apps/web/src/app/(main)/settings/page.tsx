import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/Inputs';
import { EmailField } from '@/components/ui/form/Inputs/EmailField';
import { PasswordField } from '@/components/ui/form/Inputs/PasswordField';
import React from 'react';

const SettingPage = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-6 w-[400px]">
        <div>
          <h1 className="text-2xl">Account Details</h1>
        </div>
        <div className="flex flex-col gap-6">
          <EmailField label="Email" />
          <PasswordField label="Password" />
          <TextField label="Phone Number" type="text" />

          <div className="flex justify-between items-center">
            <span>Delete Account</span>
            <Button variant={'outline'} size={'lg'}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
