'use client';
import React, { FC } from 'react';

import { X } from 'lucide-react';

import { Button, ButtonIcon } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { TextField, Label } from '../ui/form/inputs';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const STATES = ['Karnataka', 'Maharashtra', 'Tamil Nadu'];
const COUNTRIES = ['India', 'USA', 'UK'];

interface AddAddressFormProps {
  onClose: () => void;
}
const AddAddressForm: FC<AddAddressFormProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg rounded-2xl bg-white py-12 shadow-xl">
        <ScrollArea className="h-[90vh] px-12">
          <div className="mb-6 flex items-center justify-between gap-2">
            <h2 className="text-2xl font-medium leading-7">Add Address</h2>
            <ButtonIcon variant={'ghost'} size={'lg'} onClick={onClose}>
              <X className="h-5 w-5" />
            </ButtonIcon>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <TextField
                name="firstName"
                placeholder="First Name*"
                className="w-full"
                label="First Name"
              />
              <TextField
                name="lastName"
                placeholder="Last Name*"
                className="w-full"
                label="Last Name"
              />
            </div>

            <TextField
              name="street"
              placeholder="Street Address*"
              className="w-full"
              label="Street Address"
            />

            <TextField
              name="apt"
              placeholder="Apt, Suite, Building"
              className="w-full"
              label="Apt, Suite, Building"
            />

            <TextField
              name="village"
              placeholder="Town/Village"
              className="w-full"
              label="Town/Village"
            />

            <div className="flex gap-4">
              <TextField
                name="city"
                placeholder="Town/City*"
                className="w-full"
                label="Town/City"
              />
              <TextField
                name="postcode"
                placeholder="Postcode*"
                className="w-full"
                label="Postcode"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Label htmlFor="state">State*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="State*" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>State</SelectLabel>
                      {STATES.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="country">Country*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Country*" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TextField
              name="phone"
              type="tel"
              placeholder="Phone Number*"
              className="w-full"
              label="Phone Number"
            />

            <div className="flex items-center gap-2">
              <Checkbox />
              <label className="text-sm">Set as default delivery address</label>
            </div>

            <div className="mt-2">
              <Button
                type="submit"
                size={'xl'}
                className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-900"
              >
                Save
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export { AddAddressForm };
