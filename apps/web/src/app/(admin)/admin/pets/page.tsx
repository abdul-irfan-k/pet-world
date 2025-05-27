'use client';
import React from 'react';

import {
  ChevronDown,
  Search,
  Plus,
  Upload,
  Eye,
  Settings2,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

import { columns } from '@/components/admin/pets/PetColumn';
import PetTable from '@/components/admin/pets/PetTable';
import { Button } from '@/components/ui/button';
import { Pet } from '@/types/pet';

const pets: Pet[] = [
  {
    id: 'clxvoj8f0000008l3g1h2b0k7',
    name: 'Buddy',
    species: 'Dog',
    images: ['/pets/buddy.jpg'],
    videos: [],
    age: 3,
    breed: 'Golden Retriever',
    gender: 'Male',
    ownerId: 'clxvoj8f0000008l3g1h2b0k8',
    createdAt: new Date('2024-01-15T10:00:00.000Z'),
    updatedAt: new Date('2024-01-15T10:00:00.000Z'),
    petBiometricId: 'bio123',
  },
  {
    id: 'clxvoj8f0000108l3g1h2b0k9',
    name: 'Lucy',
    species: 'Cat',
    images: ['/pets/lucy.jpg'],
    videos: [],
    age: 2,
    breed: 'Siamese',
    gender: 'Female',
    ownerId: 'clxvoj8f0000008l3g1h2b0k8',
    createdAt: new Date('2023-11-20T14:30:00.000Z'),
    updatedAt: new Date('2023-11-20T14:30:00.000Z'),
  },
];

const AdminPetsManagementPage = () => {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Pet Management{` `}
            <span className="text-sm font-normal text-gray-500">
              {pets.length}
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Manage your pets and their details here.
          </p>
        </div>
        <Button variant="primary" size="default">
          <Plus className="h-4 w-4" />
          Add Pet
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Table
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-gray-100"
          >
            Board
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-gray-100"
          >
            List
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search Pets"
              className="focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm placeholder-gray-400"
            />
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
            <span>Hide</span>
          </Button>
          <Button variant="outline" size="sm">
            <Settings2 className="h-4 w-4" />
            <span>Customize</span>
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <span>Species</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <span>Breed</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <span>Gender</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-brand-600 hover:bg-brand-50"
        >
          <Plus className="h-4 w-4" />
          <span>Add filter</span>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <PetTable columns={columns} data={pets} />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Rows per page:{` `}
          <select className="focus:border-brand-500 focus:ring-brand-500 mx-1 rounded-md border-gray-300 shadow-sm sm:text-sm">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          {` `}
          1-{pets.length > 10 ? 10 : pets.length} of {pets.length} rows
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            disabled={pets.length <= 10}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            disabled={pets.length <= 10}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="sm" className="px-3 py-1.5 text-sm">
            1
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100"
            disabled={pets.length <= 10} // Example disabled logic
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:bg-gray-100"
            disabled={pets.length <= 10} // Example disabled logic
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPetsManagementPage;
