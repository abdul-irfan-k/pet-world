import React, { useMemo } from 'react';

import { Country, State, City, IState, ICity, ICountry } from 'country-state-city';
import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/form/inputs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AvailabilityLocation = () => {
  const {
    watch,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();

  const countries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountry = watch('overview.location.country');
  const selectedState = watch('overview.location.state');

  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  const cities: ICity[] = useMemo(() => {
    return selectedCountry && selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];
  }, [selectedCountry, selectedState]);

  const renderError = (fieldPath: string) => {
    const pathParts = fieldPath.split('.');
    let error = errors;
    for (const part of pathParts) {
      //eslint-disable-next-line
      //@ts-ignore
      error = error?.[part];
    }
    //eslint-disable-next-line
    //@ts-ignore
    return error?.message && <p className="mt-1 text-xs text-red-500">{error.message as string}</p>;
  };

  return (
    <div className="w-[45vw] space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-10">
      <p className="text-muted-foreground text-sm">
        Share your availability and location preferences for pet adoption.
      </p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="country">Country*</Label>
          <Controller
            name="overview.location.country"
            control={control}
            defaultValue={'IN'}
            render={({ field }) => (
              <Select
                name="overview.location.country"
                onValueChange={value => {
                  field.onChange(value);
                  setValue('overview.location.state', '');
                  setValue('overview.location.city', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country*" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    {countries.map((country: ICountry) => (
                      <SelectItem key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {renderError('overview.location.country')}
        </div>

        <div>
          <Label htmlFor="country">State*</Label>
          <Controller
            name="overview.location.state"
            control={control}
            defaultValue={'IN'}
            render={({ field }) => (
              <Select
                name="overview.location.state"
                onValueChange={value => {
                  field.onChange(value);
                  setValue('overview.location.city', '');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country*" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
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

          {renderError('overview.location.state')}
        </div>

        <div className="w-full">
          <Label htmlFor="overview.location.city">City*</Label>
          <Controller
            name="overview.location.city"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={value => {
                  field.onChange(value);
                  const selectedCity = cities.find(city => city.name === value);
                  setValue(
                    'overview.location.longitude',
                    //eslint-disable-next-line
                    //@ts-ignore
                    parseFloat(selectedCity?.longitude || 0),
                  );
                  setValue(
                    'overview.location.latitude',
                    //eslint-disable-next-line
                    //@ts-ignore
                    parseFloat(selectedCity?.latitude || 0),
                  );
                }}
                name="overview.location.city"
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
          {renderError('overview.location.city')}
        </div>
      </div>
    </div>
  );
};

export { AvailabilityLocation };
