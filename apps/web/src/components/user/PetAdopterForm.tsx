'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '../ui/button';

import {
  AdopterProfileFormProgress,
  BasicExperience,
  AvailabilityLocation,
  Bio,
  Documents,
  Review,
} from './adopter-profile-form';

import { useCreatePetAdopterProfileMutation } from '@/lib/api/userApi';

export interface FormStep {
  key: string;
  title: string;
}

export const formSteps: FormStep[] = [
  { key: 'basicExperience', title: 'Basic Information' },
  { key: 'bio', title: 'Bio' },
  { key: 'availabilityLocation', title: 'Availability & Location' },
  { key: 'documents', title: 'Documents' },
  { key: 'review', title: 'Review' },
];

const progressStepLabels = formSteps.map(step => ({ heading: step.title }));

const animationVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const PetAdopterForm = () => {
  const formMethods = useForm({
    defaultValues: {
      overview: {
        location: {
          country: 'IN',
        },
      },
    },
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  const currentStep = formSteps[stepIndex];

  const goToNextStep = async () => {
    const isValid = await formMethods.trigger();
    if (isValid) {
      setSlideDirection(1);
      setStepIndex(prev => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setSlideDirection(-1);
    setStepIndex(prev => Math.max(prev - 1, 0));
  };

  const { mutate, isPending } = useCreatePetAdopterProfileMutation({
    //eslint-disable-next-line
    onSuccess: _response => {
      formMethods.reset();
      setStepIndex(0);
      setSlideDirection(0);
      toast.success('Congrajulation You now became pet adopter', {
        description: 'Your profile has been submitted for review.',
        duration: 3000,
      });
    },
    onError: error => {
      toast.error(`Error: ${error.message}`, {
        description: 'Please try again later.',
        duration: 3000,
      });
    },
  });

  const handleSubmitForm = () => {
    const formData = formMethods.getValues();
    mutate(formData);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <AdopterProfileFormProgress steps={progressStepLabels} currentStep={stepIndex} />

      <h1 className="text-3xl font-medium">{currentStep.title}</h1>

      <div className="flex flex-col gap-5">
        <AnimatePresence initial={false} custom={slideDirection}>
          <motion.div
            key={stepIndex}
            custom={slideDirection}
            variants={animationVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <FormProvider {...formMethods}>
              {stepIndex === 0 && <BasicExperience />}
              {stepIndex === 1 && <Bio />}
              {stepIndex === 2 && <AvailabilityLocation />}
              {stepIndex === 3 && <Documents />}
              {stepIndex === 4 && <Review setStepIndex={setStepIndex} />}
            </FormProvider>
          </motion.div>
        </AnimatePresence>

        <div className="flex w-full justify-end">
          <div className="flex gap-4">
            <Button variant="outline" onClick={goToPreviousStep} disabled={stepIndex === 0}>
              {stepIndex === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="primary"
              onClick={stepIndex === formSteps.length - 1 ? handleSubmitForm : goToNextStep}
              disabled={isPending}
            >
              {stepIndex === formSteps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetAdopterForm };
