'use client';
import React, { FC, useState, useEffect } from 'react';

import {
  Country,
  State,
  City,
  IState,
  ICity,
  ICountry,
} from 'country-state-city';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

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
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [selectedCountryValue, setSelectedCountryValue] = useState('IN');
  const [selectedStateValue, setSelectedStateValue] = useState('');
  const [selectedCityValue, setSelectedCityValue] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      street: '',
      apt: '',
      country: 'IN',
      state: '',
      city: '',
      postcode: '',
      phone: '',
      isDefault: false,
    },
  });

  useEffect(() => {
    if (selectedCountryValue) {
      const result = State.getStatesOfCountry(selectedCountryValue);
      setStates(result);
      setSelectedStateValue('');
      setSelectedCityValue('');
      setValue('country', selectedCountryValue);
      setValue('state', '');
      setValue('city', '');
    } else {
      setStates([]);
      setSelectedStateValue('');
      setSelectedCityValue('');
      setValue('country', '');
      setValue('state', '');
      setValue('city', '');
    }
  }, [selectedCountryValue, setValue]);

  useEffect(() => {
    if (selectedCountryValue && selectedStateValue) {
      const result = City.getCitiesOfState(
        selectedCountryValue,
        selectedStateValue,
      );
      setCities(result);
      setSelectedCityValue('');
      setValue('state', selectedStateValue);
      setValue('city', '');
    } else {
      setCities([]);
      setSelectedCityValue('');
      setValue('city', '');
    }
  }, [selectedCountryValue, selectedStateValue, setValue]);

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      country: selectedCountryValue,
      state: selectedStateValue,
      city: selectedCityValue,
      isDefault: isDefaultAddress,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white py-8 shadow-xl sm:py-12">
        <ScrollArea className="h-[90vh] px-6 sm:px-12">
          <div className="mb-6 flex items-center justify-between gap-2">
            <h2 className="text-xl font-medium leading-7 sm:text-2xl">
              Add Address
            </h2>
            <ButtonIcon
              variant={'ghost'}
              size={'lg'}
              onClick={onClose}
              className="h-10 w-10"
            >
              <X className="h-6 w-6" />
            </ButtonIcon>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <TextField
                placeholder="Home or Office"
                className="w-full"
                label="Name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            <div>
              <TextField
                placeholder="Street Address*"
                className="w-full"
                label="Street Address"
                {...register('street')}
                error={errors.street?.message}
              />
            </div>

            <TextField
              placeholder="Apt, Suite, Building"
              className="w-full"
              label="Apt, Suite, Building"
              {...register('apt')}
              error={errors.apt?.message}
            />

            <div className="w-full">
              <Label htmlFor="country">Country*</Label>
              <Select
                onValueChange={value => {
                  setSelectedCountryValue(value);
                  setValue('country', value);
                }}
                defaultValue={selectedCountryValue}
                value={selectedCountryValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Country*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {Country.getAllCountries().map((country: ICountry) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="state">State*</Label>
              <Select
                onValueChange={value => {
                  setSelectedStateValue(value);
                  setValue('state', value);
                }}
                value={selectedStateValue}
                disabled={!selectedCountryValue || states.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="State*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>State</SelectLabel>
                    {states.map((state: IState) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="city">City*</Label>
              <Select
                onValueChange={value => {
                  setSelectedCityValue(value);
                  setValue('city', value);
                }}
                value={selectedCityValue}
                disabled={!selectedStateValue || cities.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="City*" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    {cities.map((city: ICity) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <TextField
                placeholder="Postcode*"
                className="w-full"
                label="Postcode"
                {...register('postcode')}
                error={errors.postcode?.message}
              />
            </div>
            <div>
              <TextField
                type="tel"
                placeholder="Phone Number*"
                className="w-full"
                label="Phone Number"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={isDefaultAddress}
                onCheckedChange={checked => {
                  const value = !!checked;
                  setIsDefaultAddress(value);
                  setValue('isDefault', value);
                }}
                id="isDefault"
              />
              <label htmlFor="isDefault" className="text-sm">
                Set as default delivery address
              </label>
            </div>

            <div className="mt-auto pt-2">
              <Button
                type="submit"
                size={'xl'}
                className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-900"
              >
                Save
              </Button>
            </div>
          </form>
        </ScrollArea>
      </div>
    </div>
  );
};

export { AddAddressForm };
