'use client';
import React, { useState } from 'react';

import Image from 'next/image';

import { X, Plus, Upload } from 'lucide-react';

import { Button } from '../ui/button';
import { Label, TextField } from '../ui/form/inputs';
import { ImagePreviewModal } from '../ui/image-preview-modal';
import { Textarea } from '../ui/textarea';

const AddPetForm = () => {
  const [selectedSpecies, setSelectedSpecies] = useState('Dog');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [imagePreviewModalSrc, setImagePreviewModalSrc] = useState<
    string | null
  >(null);

  const placeholderImages = [
    '/pets/dog-1.jpeg',
    '/pets/dog-2.jpeg',
    '/pets/dog-3.jpeg',
    '/pets/dog-4.jpeg',
  ];

  const onImagePreviewModalClose = () => {
    setImagePreviewModalSrc(null);
  };
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-lg">🐾</span>
          <h1 className="text-xl font-medium">Add New Pet</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button size={'lg'} variant="outline" rounded>
            <span className="mr-2 text-gray-700">📄</span>
            Save Draft
          </Button>
          <Button
            size={'lg'}
            variant="black"
            rounded
            className="bg-green-500 hover:bg-green-600"
          >
            <span className="mr-2">✓</span>
            Add Pet
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">General Information</h2>

              <div className="mb-4">
                <TextField
                  label="Pet Name"
                  placeholder="e.g., Buddy"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <TextField
                  label="Pet Biometric ID (Optional)"
                  placeholder="e.g., PETID-39421"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Species
                </Label>
                <div className="mb-2 text-sm text-gray-500">Select Species</div>
                <div className="flex space-x-3">
                  {['Dog 🐶', 'Cat 🐱', 'Rabbit 🐰'].map(species => (
                    <button
                      key={species}
                      className={`flex items-center justify-center rounded-md px-6 py-3 ${
                        selectedSpecies === species.split(' ')[0]
                          ? 'border-2 border-green-500 bg-green-100'
                          : 'border border-gray-200 bg-gray-50'
                      }`}
                      onClick={() => setSelectedSpecies(species.split(' ')[0])}
                    >
                      <span className="text-sm">{species}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <TextField
                  label="Breed"
                  placeholder="e.g., Golden Retriever"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Gender
                </Label>
                <div className="mb-2 text-sm text-gray-500">Select Gender</div>
                <div className="flex space-x-3">
                  {['Male', 'Female', 'Unknown'].map(gender => (
                    <button
                      key={gender}
                      className={`flex items-center justify-center rounded-md px-6 py-3 ${
                        selectedGender === gender
                          ? 'border-2 border-green-500 bg-green-100'
                          : 'border border-gray-200 bg-gray-50'
                      }`}
                      onClick={() => setSelectedGender(gender)}
                    >
                      <span className="text-sm">{gender}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <TextField
                  label="Age (years)"
                  type="number"
                  placeholder="e.g., 2"
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  placeholder="Buddy is a well-trained golden retriever, friendly with children and other pets. Needs a new home as I'll be relocating abroad."
                  rows={4}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </Label>
                <TextField
                  placeholder="e.g., Mangalore, Karnataka"
                  className="w-full"
                  type="text"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Upload Media</h2>

              <div className="mb-6">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-600">
                    Drag & drop pet images
                  </p>
                  <p className="mb-3 text-xs text-gray-500">or</p>
                  <Button
                    size={'lg'}
                    variant="outline"
                    className="rounded-md px-4 py-2 text-sm"
                  >
                    Browse Files
                  </Button>
                  <p className="mt-3 text-xs text-gray-500">Max 8 images</p>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-2">
                {placeholderImages.map((img, index) => (
                  <div
                    key={index}
                    className="group relative h-20 w-20 rounded-md border border-gray-200"
                    onClick={() => setImagePreviewModalSrc(img)}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${index}`}
                      className="h-20 w-full object-cover"
                      fill
                    />
                    <button className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-0.5 opacity-0 group-hover:opacity-100">
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300">
                  <Plus className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-3 block text-sm font-medium text-gray-700">
                  Upload Videos (optional)
                </label>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-600">
                    Drag & drop pet videos
                  </p>
                  <p className="mb-3 text-xs text-gray-500">or</p>
                  <Button
                    size={'lg'}
                    variant="outline"
                    className="rounded-md px-4 py-2 text-sm"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imagePreviewModalSrc && (
        <ImagePreviewModal
          src={imagePreviewModalSrc}
          alt="Image Preview"
          open={!!imagePreviewModalSrc}
          onClose={onImagePreviewModalClose}
        />
      )}
    </div>
  );
};

export { AddPetForm };
