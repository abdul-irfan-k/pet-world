'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UploadMediaSection } from './add-pet-form/UploadMediaSection';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/inputs';
import { Label } from '@/components/ui/form/inputs';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePetMutation } from '@/lib/api/petsApi';
import { addPetSchema, IAddPetInput } from '@/lib/schemas/petSchema';

const AddPetForm = () => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [media, setMedia] = useState<{ images: string[]; videos: string[] }>({
    images: [],
    videos: [],
  });
  const [isMediaUploading, setIsMediaUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<IAddPetInput>({
    resolver: zodResolver(addPetSchema),
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: undefined,
      profile: {},
    },
  });

  const { mutate: createPet, isPending: isCreatingPet } = useCreatePetMutation({
    onSuccess: response => {
      toast.success(response.message || 'Pet added successfully!', {
        description: `Name: ${response.data.pet.name}, Species: ${response.data.pet.species}`,
      });
      reset();
    },
    onError: error => {
      toast.error(
        //eslint-disable-next-line
        //@ts-ignore
        error.response?.data?.message || 'Failed to add pet. Please try again.',
      );
    },
  });

  const watchedSpecies = watch('species');

  const onSubmit = (data: IAddPetInput) => {
    if (isMediaUploading) {
      toast.warning('Please wait until image and video is fully uploaded.');
      return;
    }
    createPet({
      ...data,
      images: media.images,
      videos: media.videos,
      gender: selectedGender ?? 'Unknown',
    });
  };

  const placeholderImages = [
    '/pets/dog-1.jpg',
    '/pets/cat-1.jpg',
    '/pets/dog-2.jpg',
  ];

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
            onClick={handleSubmit(onSubmit)}
            isLoading={isCreatingPet}
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
                  label="Pet Name*"
                  placeholder="e.g., Buddy"
                  className="w-full"
                  {...register('name')}
                  error={errors.name?.message}
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
                  Species*
                </Label>
                <div className="mb-2 text-sm text-gray-500">Select Species</div>
                <div className="flex space-x-3">
                  {['Dog 🐶', 'Cat 🐱', 'Rabbit 🐰'].map(speciesItem => {
                    const speciesValue = speciesItem.split(' ')[0];
                    return (
                      <button
                        key={speciesValue}
                        type="button"
                        className={`flex items-center justify-center rounded-md px-6 py-3 ${
                          watchedSpecies === speciesValue
                            ? 'border-2 border-green-500 bg-green-100'
                            : 'border border-gray-200 bg-gray-50'
                        }`}
                        onClick={() => {
                          setValue('species', speciesValue, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <span className="text-sm">{speciesItem}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.species && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.species.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <TextField
                  label="Breed*"
                  placeholder="e.g., Golden Retriever"
                  className="w-full"
                  {...register('breed')}
                  error={errors.breed?.message}
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
                  label="Age (years)*"
                  type="number"
                  placeholder="e.g., 2"
                  className="w-full"
                  {...register('age', { valueAsNumber: true })}
                  error={errors.age?.message}
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
            <UploadMediaSection
              placeholderImages={placeholderImages}
              setIsMediaUploading={setIsMediaUploading}
              setMedia={setMedia}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddPetForm };
