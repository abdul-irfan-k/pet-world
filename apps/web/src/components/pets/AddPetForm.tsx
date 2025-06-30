'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UploadMediaSection } from './add-pet-form';

import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/form/inputs';
import { Label } from '@/components/ui/form/inputs';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCreatePetMutation } from '@/lib/api/petsApi';
import { addPetSchema, IAddPetInput } from '@/lib/schemas/petSchema';
import { cn } from '@/lib/utils';

const AddPetForm = () => {
  const router = useRouter();
  const {
    data: draftPetData,
    removeData: removeDraftPetData,
    setData: setDraftPetData,
  } = useLocalStorage<IAddPetInput>('add-pet-form');

  const [isMediaUploading, setIsMediaUploading] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  const [media, setMedia] = useState<{ images: string[]; videos: string[] }>({
    images: [],
    videos: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    getValues,
  } = useForm<IAddPetInput>({
    resolver: zodResolver(addPetSchema),
  });

  const { mutate: createPet, isPending: isCreatingPet } = useCreatePetMutation({
    onSuccess: response => {
      removeDraftPetData();
      toast.success(response.message || 'Pet added successfully!', {
        description: `Name: ${response.data.pet.name}, Species: ${response.data.pet.species}`,
      });
      reset();
      router.push('/pets/my-pets');
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

  const onSaveDraft = () => {
    const formData = getValues();
    setDraftPetData({ ...formData, gender: selectedGender, images: media.images, videos: media.videos });
    toast.success('Draft saved successfully!');
  };

  useEffect(() => {
    if (draftPetData) {
      reset({
        ...draftPetData,
      });
      if (draftPetData.gender) setSelectedGender(draftPetData.gender);
    }
  }, [draftPetData]);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-lg">🐾</span>
          <h1 className="text-xl font-medium">Add New Pet</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button size={'lg'} variant="outline" rounded onClick={onSaveDraft}>
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
                  {...register('petBiometricId')}
                  error={errors.petBiometricId?.message}
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">Species*</Label>
                <div className="mb-2 text-sm text-gray-500">Select Species</div>
                <div className="flex space-x-3">
                  {['Dog 🐶', 'Cat 🐱', 'Rabbit 🐰'].map(speciesItem => {
                    const speciesValue = speciesItem.split(' ')[0];
                    const isSelected = watchedSpecies
                      ? watchedSpecies === speciesValue
                      : draftPetData?.species === speciesValue;

                    return (
                      <button
                        key={speciesValue}
                        type="button"
                        className={cn(
                          'flex items-center justify-center rounded-md px-6 py-3',
                          isSelected ? 'border-2 border-green-500 bg-green-100' : 'border border-gray-200 bg-gray-50',
                        )}
                        onClick={() => {
                          setValue('species', speciesValue);
                        }}
                      >
                        <span className="text-sm">{speciesItem}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.species && <p className="mt-1 text-xs text-red-500">{errors.species.message}</p>}
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
                <Label className="mb-1 block text-sm font-medium text-gray-700">Gender</Label>
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
                <Label className="mb-1 block text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  placeholder="Buddy is a well-trained golden retriever, friendly with children and other pets. Needs a new home as I'll be relocating abroad."
                  rows={4}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3"
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">Location</Label>
                <TextField placeholder="e.g., Mangalore, Karnataka" className="w-full" type="text" />
              </div>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            <UploadMediaSection setIsMediaUploading={setIsMediaUploading} setMedia={setMedia} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddPetForm };
