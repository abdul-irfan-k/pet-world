'use client';

import React, { useState } from 'react';

import { Check, MapPin } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useGetUserAddressesQuery } from '@/lib/api/userApi';
import { Location } from '@/types/Location';

interface LocationSelectorProps {
  onLocationSelected: (location: Location | null) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelected,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const { data: addressesData, isLoading } = useGetUserAddressesQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onLocationSelected(location);
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-auto min-h-[100px] items-center justify-center rounded-lg bg-gray-50 p-4">
        <p className="text-gray-500">Loading your addresses...</p>
      </div>
    );
  }

  if (
    !addressesData?.data?.locations ||
    addressesData.data.locations.length === 0
  ) {
    return (
      <div className="flex h-auto min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
        <p className="mb-3 text-sm text-gray-500">
          {"You don't have any addresses added yet."}
        </p>
        <a
          href="/profile/addresses/add" // Assuming this is the correct path
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
        >
          + Add an Address
        </a>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? 'item-1' : ''}
      onValueChange={value => setIsOpen(value === 'item-1')}
      className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm"
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="w-full p-4 transition-colors hover:bg-gray-50 data-[state=open]:border-b data-[state=open]:border-gray-200 data-[state=open]:bg-green-50 data-[state=open]:hover:bg-green-100">
          {selectedLocation ? (
            <div className="flex w-full items-center space-x-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow-inner">
                <MapPin className="h-7 w-7 text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800">
                  {selectedLocation.name || 'Unnamed Address'}
                </h4>
                <p className="text-xs text-gray-500">
                  {selectedLocation.apt}, {selectedLocation.city}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Choose a location for the service
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className="bg-white p-0">
          <div className="grid max-h-[300px] grid-cols-1 gap-3 overflow-y-auto p-4 sm:grid-cols-2">
            {addressesData.data.locations.map((location: Location) => (
              <div
                key={location.id}
                className={`relative cursor-pointer overflow-hidden rounded-lg border p-3 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-green-400 hover:shadow-md ${
                  selectedLocation?.id === location.id
                    ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                onClick={() => handleLocationSelect(location)}
                onKeyDown={e =>
                  e.key === 'Enter' && handleLocationSelect(location)
                }
                tabIndex={0}
                role="button"
                aria-pressed={selectedLocation?.id === location.id}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 shadow-inner">
                    <MapPin className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-700">
                      {location.name || 'Unnamed Address'}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {location.street}, {location.city}, {location.state}{' '}
                      {location.postcode}
                    </p>
                  </div>
                </div>
                {selectedLocation?.id === location.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1 shadow">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
