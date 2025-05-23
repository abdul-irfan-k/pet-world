'use client';
import React, { FC, useState, useMemo } from 'react';

import {
  Country,
  State,
  City,
  IState,
  ICity,
  ICountry,
} from 'country-state-city';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

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

interface AddAddressFormProps {
  onClose: () => void;
}

const AddAddressForm: FC<AddAddressFormProps> = ({ onClose }) => {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch,
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

  const countries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountry = watch('country');
  const selectedState = watch('state');

  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  const cities: ICity[] =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState)
      : [];

  const onSubmit = (data: any) => {
    console.log({
      ...data,
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

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={selectedCountry}
                    value={field.value}
                    onValueChange={value => {
                      field.onChange(value);
                      setValue('state', '');
                      setValue('city', '');
                    }}
                    name="country"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Country*" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        {countries.map((country: ICountry) => (
                          <SelectItem
                            key={country.isoCode}
                            value={country.isoCode}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="state">State*</Label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={value => {
                      field.onChange(value);
                      setValue('city', '');
                    }}
                    disabled={!selectedCountry || states.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="State*" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
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
                )}
              />
              {errors.state && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="city">City*</Label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!selectedState || cities.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="City*" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px]">
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
                )}
              />
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
