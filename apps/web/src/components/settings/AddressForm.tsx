'use client';
import React, { FC, useState, useMemo } from 'react';

import { AxiosError } from 'axios';
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
import { toast } from 'sonner';

import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from '../../lib/api/userApi';
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

import { Location } from '@/types/Location';

interface AddressFormProps {
  onClose: () => void;
  onSuccess?: (data: Location, mode: 'create' | 'edit') => void;
  initialData?: Partial<Location>;
  mode?: 'create' | 'edit';
}

const AddressForm: FC<AddressFormProps> = ({
  onClose,
  onSuccess,
  initialData,
  mode = initialData?.id ? 'edit' : 'create',
}) => {
  const [isDefaultAddress, setIsDefaultAddress] = useState(
    initialData?.isDefault || false,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    watch,
  } = useForm<Location>({
    defaultValues: {
      name: initialData?.name || '',
      street: initialData?.street || '',
      apt: initialData?.apt || '',
      country: initialData?.country || 'IN',
      state: initialData?.state || '',
      city: initialData?.city || '',
      postcode: initialData?.postcode || '',
      isDefault: initialData?.isDefault || false,
      latitude: initialData?.latitude || '',
      longitude: initialData?.longitude || '',
    },
  });

  const createMutation = useCreateAddressMutation({
    onSuccess: response => {
      onSuccess?.(response.data.location as Location, 'create');
      toast.success(response.message);
      onClose();
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to create address. Please try again.';
      toast.error(errorMessage);
    },
  });

  const updateMutation = useUpdateAddressMutation({
    onSuccess: response => {
      onSuccess?.(response.data.location as Location, 'edit');
      toast.success(response.message);
      onClose();
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to update address. Please try again.';
      toast.error(errorMessage);
    },
  });

  const countries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountry = watch('country');
  const selectedState = watch('state');

  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  const cities: ICity[] = useMemo(() => {
    return selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry, selectedState)
      : [];
  }, [selectedCountry, selectedState]);

  const handleFormSubmit = (data: Location) => {
    const formData: Location = {
      ...data,
      isDefault: isDefaultAddress,
      latitude: watch('latitude'),
      longitude: watch('longitude'),
    };

    if (mode === 'create') createMutation.mutate(formData);
    else if (initialData?.id && mode === 'edit')
      updateMutation.mutate({
        ...formData,
        id: initialData.id,
        latitude: watch('latitude'),
        longitude: watch('longitude'),
      });
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const formTitle = mode === 'create' ? 'Add Address' : 'Edit Address';
  const submitButtonText =
    mode === 'create' ? 'Save Address' : 'Update Address';

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={e => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white py-8 shadow-xl sm:py-12">
        <ScrollArea className="h-[90vh] px-6 sm:px-12">
          <div className="mb-6 flex items-center justify-between gap-2">
            <h2 className="text-xl font-medium leading-7 sm:text-2xl">
              {formTitle}
            </h2>
            <ButtonIcon
              variant={'ghost'}
              size={'lg'}
              onClick={onClose}
              className="h-10 w-10"
              disabled={isSubmitting}
            >
              <X className="h-6 w-6" />
            </ButtonIcon>
          </div>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <TextField
                placeholder="Home or Office"
                className="w-full"
                label="Name"
                {...register('name')}
                error={errors.name?.message}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <TextField
                placeholder="Street Address*"
                className="w-full"
                label="Street Address"
                {...register('street')}
                error={errors.street?.message}
                disabled={isSubmitting}
              />
            </div>

            <TextField
              placeholder="Apt, Suite, Building"
              className="w-full"
              label="Apt, Suite, Building"
              {...register('apt')}
              error={errors.apt?.message}
              disabled={isSubmitting}
            />
            <div className="w-full">
              <Label htmlFor="country">Country*</Label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={value => {
                      field.onChange(value);
                      setValue('state', '');
                      setValue('city', '');
                    }}
                    name="country"
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country*" />
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
                  {errors.country.message as string}
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
                    disabled={
                      !selectedCountry || states.length === 0 || isSubmitting
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select State*" />
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
                  {errors.state.message as string}
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
                    onValueChange={value => {
                      field.onChange(value);
                      const selectedCity = cities.find(
                        city => city.name === value,
                      );
                      setValue('longitude', selectedCity?.longitude || '');
                      setValue('latitude', selectedCity?.latitude || '');
                    }}
                    disabled={
                      !selectedState || cities.length === 0 || isSubmitting
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City*" />
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
                  {errors.city.message as string}
                </p>
              )}
            </div>

            <div>
              <TextField
                placeholder="Postcode*"
                className="w-full"
                label="Postcode"
                {...register('postcode', {
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Invalid postcode format (6 digits expected)',
                  },
                })}
                error={errors.postcode?.message}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <label htmlFor="isDefault" className="text-sm">
                Set as default delivery address
              </label>
            </div>

            <div className="mt-auto flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size={'xl'}
                className="flex-1"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size={'xl'}
                className="flex-1 bg-black text-white hover:bg-gray-900 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {mode === 'create' ? 'Saving...' : 'Updating...'}
                  </div>
                ) : (
                  submitButtonText
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </div>
    </div>
  );
};

export { AddressForm };
