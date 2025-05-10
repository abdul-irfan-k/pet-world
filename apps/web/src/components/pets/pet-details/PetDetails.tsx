import { MapPin } from 'lucide-react';
import React, { FC } from 'react';

interface PetDetailsProps {
  name: string;
  species: string;
  breed: string;
  color: string;
  size: string;
  gender: string;
  location: string;
  age: string;
}

const PetDetails: FC<PetDetailsProps> = props => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{props.name}</h1>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
          Available
        </span>
      </div>
      <div className="text-muted-foreground mb-4 mt-1 flex items-center text-lg">
        <MapPin size={16} className="mr-1" />
        <span>{props.location}</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-y-2">
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Breed</p>
          <p>{props.breed}</p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Color</p>
          <p>{props.color}</p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Gender</p>
          <p>{props.gender}</p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Size</p>
          <p>{props.size}</p>
        </div>
        <div className="w-1/2">
          <p className="text-sm text-gray-600">Age</p>
          <p>{props.age}</p>
        </div>
      </div>
    </div>
  );
};

export { PetDetails };
