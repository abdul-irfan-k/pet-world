'use client';
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UploadMediaSection } from './add-pet-form';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/inputs';
import { Label } from '@/components/ui/form/inputs';
import { Textarea } from '@/components/ui/textarea';
import { useUpdatePetMutation, useGetPetByIdQuery } from '@/lib/api/petsApi';
import { addPetSchema, IAddPetInput } from '@/lib/schemas/petSchema';

interface UpdatePetFormProps {
  petId: string;
}

const UpdatePetForm: React.FC<UpdatePetFormProps> = ({ petId }) => {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [media, setMedia] = useState<{ images: string[]; videos: string[] }>({
    images: [],
    videos: [],
  });
  const [isMediaUploading, setIsMediaUploading] = useState(false);

  // Fetch the pet data
  const { data: petData, isLoading: isPetLoading } = useGetPetByIdQuery(petId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  // Update form values when pet data is loaded
  useEffect(() => {
    if (petData?.data.pet) {
      const pet = petData.data.pet;
      setValue('name', pet.name);
      setValue('species', pet.species);
      setValue('breed', pet.breed);
      setValue('age', pet.age);

      // Set gender
      setSelectedGender(pet.gender || 'Unknown');

      // Set media
      if (pet.images || pet.videos) {
        setMedia({
          images: pet.images || [],
          videos: pet.videos || [],
        });
      }
    }
  }, [petData, setValue]);

  const { mutate: updatePet, isPending: isUpdatingPet } = useUpdatePetMutation({
    onSuccess: response => {
      toast.success(response.message || 'Pet updated successfully!', {
        description: `Name: ${response.data.pet.name}, Species: ${response.data.pet.species}`,
      });
      router.push('/pets/my-pets');
    },
    onError: error => {
      toast.error(
        //eslint-disable-next-line
        //@ts-ignore
        error.response?.data?.message ||
          'Failed to update pet. Please try again.',
      );
    },
  });

  const watchedSpecies = watch('species');

  const onSubmit = (data: IAddPetInput) => {
    if (isMediaUploading) {
      toast.warning('Please wait until image and video is fully uploaded.');
      return;
    }
    updatePet({
      id: petId,
      ...data,
      images: media.images,
      videos: media.videos,
      gender: selectedGender ?? 'Unknown',
    });
  };

  if (isPetLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading pet details...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-lg">🐾</span>
          <h1 className="text-xl font-medium">Update Pet</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            size={'lg'}
            variant="outline"
            rounded
            onClick={() => router.push(`/pets/${petId}`)}
          >
            <span className="mr-2 text-gray-700">❌</span>
            Cancel
          </Button>
          <Button
            size={'lg'}
            variant="black"
            rounded
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit(onSubmit)}
            isLoading={isUpdatingPet}
          >
            <span className="mr-2">✓</span>
            Update Pet
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
                  // defaultValue={petData?.data?.pet?.biometricId || ''}
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
                      type="button"
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
                  // defaultValue={petData?.data?.pet?.description || ''}
                  // {...register('description')}
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
                  // defaultValue={petData?.data?.pet?.location || ''}
                  // {...register('location')}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            <UploadMediaSection
              setIsMediaUploading={setIsMediaUploading}
              setMedia={setMedia}
              existingMedia={media}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdatePetForm };
