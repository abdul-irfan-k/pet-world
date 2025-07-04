'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { LocationSelector } from './pet-care-request/LocationSelector';
import { PetSelector } from './pet-care-request/PetSelector';

import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { TextAreaField, TextField } from '@/components/ui/form/inputs';
import { Label } from '@/components/ui/form/inputs';
import { useCreatePetCareRequestMutation } from '@/lib/api/petCareApi';
import {
  addPetCareRequestSchema,
  IAddPetCareRequestInput,
} from '@/lib/schemas/petCareSchema';
import { Location } from '@/types/Location';
import { Pet } from '@/types/pet';

const AddPetCareRequestForm = () => {
  const router = useRouter();
  const [selectedPet, setSelectedPet] = useState<null | Pet>(null);
  const [selectedLocation, setSelectedLocation] = useState<null | Location>(
    null,
  );
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)), // Default 1 week
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(addPetCareRequestSchema),
    defaultValues: {
      title: '',
      amount: 5000,
      description: '',
      questions: {},
    },
  });

  const { mutate: createPetCareRequest, isPending: isCreatingPetCareRequest } =
    useCreatePetCareRequestMutation({
      onSuccess: () => {
        toast.success('Pet care request created successfully!');
        reset();
        router.push('/pet-care/my-requests');
      },
      onError: () => {
        toast.error('Failed to create pet care request. Please try again.');
      },
    });

  const onSubmit = (data: IAddPetCareRequestInput) => {
    if (!selectedPet) {
      toast.warning('Please seelect a pet');
      return;
    }

    if (!selectedLocation) {
      toast.warning('Please select a location');
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      toast.warning('Please select a date range');
      return;
    }

    createPetCareRequest({
      ...data,
      petId: selectedPet.id,
      locationId: selectedLocation.id,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
  };

  console.log('errors', errors);

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 text-lg">🐾</span>
          <h1 className="text-xl font-medium">Add Pet Care Request</h1>
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
            isLoading={isCreatingPetCareRequest}
          >
            <span className="mr-2">✓</span>
            Create Request
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Request Details</h2>

              <div className="mb-4">
                <TextField
                  label="Request Title*"
                  placeholder="e.g., Pet Sitting for my Golden Retriever"
                  className="w-full"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Select Pet*
                </Label>
                <PetSelector onPetSelected={setSelectedPet} />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Location*
                </Label>
                <LocationSelector onLocationSelected={setSelectedLocation} />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Date Range*
                </Label>
                <div className="mb-2 text-sm text-gray-500">
                  When do you need pet care?
                </div>
                <DatePickerWithRange
                  dateRange={dateRange}
                  //eslint-disable-next-line
                  //@ts-ignore
                  onDateRangeChange={setDateRange}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <TextField
                  label="Budget Amount*"
                  placeholder="e.g., $50 per day"
                  type="number"
                  className="w-full"
                  {...register('amount', { valueAsNumber: true })}
                  error={errors.amount?.message}
                />
              </div>

              <div className="mb-4">
                <TextAreaField
                  label="Description*"
                  {...register('description')}
                  placeholder="Describe what kind of care your pet needs, any special requirements, feeding schedules, or other important details."
                  rows={4}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 p-3"
                  error={errors.description?.message}
                />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">
                Questions for Caretakers
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                Add questions that potential caretakers should answer when
                applying for your pet care request.
              </p>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Question 1
                </Label>
                <TextField
                  placeholder="e.g., Do you have experience with dogs?"
                  className="w-full"
                  onChange={e => {
                    const questions = watch('questions') || [];
                    //eslint-disable-next-line
                    //@ts-ignore
                    questions[0] = e.target.value;
                    // setValue('questions', questions);
                  }}
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Question 2
                </Label>
                <TextField
                  placeholder="e.g., Are you comfortable administering medication?"
                  className="w-full"
                  onChange={e => {
                    const questions = watch('questions') || [];
                    //eslint-disable-next-line
                    //@ts-ignore
                    questions[1] = e.target.value;
                    setValue('questions', questions);
                  }}
                />
              </div>

              <div className="mb-4">
                <Label className="mb-1 block text-sm font-medium text-gray-700">
                  Question 3
                </Label>
                <TextField
                  placeholder="e.g., Can you provide references from previous pet sitting jobs?"
                  className="w-full"
                  onChange={e => {
                    const questions = watch('questions') || [];
                    //eslint-disable-next-line
                    //@ts-ignore
                    questions[2] = e.target.value;
                    setValue('questions', questions);
                  }}
                />
              </div>

              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  const questions = watch('questions') || [];
                  questions.push('');
                  setValue('questions', questions);
                }}
              >
                + Add Another Question
              </Button>
            </div>
          </div>

          <div className="space-y-6 md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">Request Summary</h2>

              <div className="mb-4 rounded-lg bg-green-50 p-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-600" />
                  <h3 className="text-sm font-medium text-green-800">
                    Request Timeline
                  </h3>
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    {dateRange.from && dateRange.to
                      ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                      : 'Select dates'}
                  </p>
                  <p className="mt-1"></p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Pet Information
                </h3>
                {selectedPet ? (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm">{selectedPet.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedPet.breed}, {selectedPet.age} years old
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm text-gray-500">Please select a pet</p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Location
                </h3>
                {selectedLocation ? (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm">{selectedLocation.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedLocation.street}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-sm text-gray-500">
                      Please select a location
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="mb-2 text-sm font-medium text-gray-700">
                  Expected Budget
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-medium">{watch('amount') || '-'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium">
                Tips for Quick Responses
              </h2>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    {"Be clear about your pet's needs and care requirements"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    Include any specific feeding, medication, or exercise
                    schedules
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>Upload recent photos of your pet</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span>
                    Provide a reasonable budget for the requested services
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddPetCareRequestForm };
