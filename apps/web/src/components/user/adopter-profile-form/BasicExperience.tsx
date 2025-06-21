import React from 'react';

import { useFormContext } from 'react-hook-form';

import { TextAreaField, TextField } from '@/components/ui/form/inputs';

const BasicExperience = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-[45vw] space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-10">
      <p className="text-muted-foreground text-sm">
        Share your relevant experience as a pet adopter or animal caretaker.
      </p>

      <div className="space-y-4">
        <div className="space-y-3">
          <TextField
            label="How many years of experience do you have caring for pets?"
            placeholder="e.g., 5 years"
            {...register('yearOfExperience', { required: 'Experience years is required' })}
            //eslint-disable-next-line
            //@ts-ignore
            error={errors?.yearOfExperience?.message}
          />
        </div>

        <div className="space-y-3">
          <TextField
            placeholder="e.g., Animal Care Certification, Pet First Aid"
            name="certifications"
            label="Certifications (if any)"
          />
        </div>

        <div className="space-y-3">
          <TextField
            placeholder="e.g., Dog Training, Cat Behavior"
            label="Specialization (if any)"
            {...register('overview.specialization', { required: 'Specialization is required' })}
            //eslint-disable-next-line
            //@ts-ignore
            error={errors?.overview?.specialization?.message}
          />
        </div>

        <div className="space-y-3">
          <TextField
            placeholder="e.g., Dogs, Cats, Birds"
            label="Preferred Pets"
            {...register('overview.preferredPets', { required: 'Preferred pets is required' })}
            //eslint-disable-next-line
            //@ts-ignore
            error={errors?.overview?.preferredPets?.message}
          />
        </div>

        <div className="space-y-3">
          <TextAreaField
            placeholder="Share your passion for animal care and what drives you to help pets in need."
            rows={4}
            label="Why do you want to be a pet adopter?"
            {...register('overview.motivation', { required: 'Motivation is required' })}
            //eslint-disable-next-line
            //@ts-ignore
            error={errors?.overview?.motivation?.message}
          />
        </div>
      </div>
    </div>
  );
};

export { BasicExperience };
