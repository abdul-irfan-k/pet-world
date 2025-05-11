import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/Inputs';
import { EmailField } from '@/components/ui/form/Inputs/EmailField';
import { Label } from '@/components/ui/form/Inputs/Label';
import { PasswordField } from '@/components/ui/form/Inputs/PasswordField';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

          <div className="flex flex-col gap-6 mt-6">
            <span>Location</span>
            <div className="flex flex-col gap-1.5">
              <Label>Country/Region</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Cities</SelectLabel>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mangalore">Mangalore</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>State</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="andhrapradesh">
                      Andhra Pradesh
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <TextField label="Town/City" type="text" />
            <TextField label="Postcode" type="text" />
          </div>

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
