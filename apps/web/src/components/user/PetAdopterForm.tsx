'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';

import { Button } from '../ui/button';

import {
  AdopterProfileFormProgress,
  BasicExperience,
  AvailabilityLocation,
  Bio,
  Documents,
  Review,
} from './adopter-profile-form';

export interface FormStep {
  key: string;
  title: string;
  Component: React.ComponentType<any>;
}

export const formSteps: FormStep[] = [
  { key: 'basicExperience', title: 'Basic Information', Component: BasicExperience },
  { key: 'bio', title: 'Bio', Component: Bio },
  { key: 'availabilityLocation', title: 'Availability & Location', Component: AvailabilityLocation },
  { key: 'documents', title: 'Documents', Component: Documents },
  { key: 'review', title: 'Review', Component: Review },
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
  const StepComponent = currentStep.Component;

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <FormProvider {...formMethods}>
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
              <StepComponent setStepIndex={setStepIndex} />
            </motion.div>
          </AnimatePresence>

          <div className="flex w-full justify-end">
            <div className="flex gap-4">
              <Button variant="outline" onClick={goToPreviousStep} disabled={stepIndex === 0}>
                {stepIndex === 0 ? 'Cancel' : 'Back'}
              </Button>
              <Button variant="primary" onClick={goToNextStep} disabled={stepIndex === formSteps.length - 1}>
                {stepIndex === formSteps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export { PetAdopterForm };
