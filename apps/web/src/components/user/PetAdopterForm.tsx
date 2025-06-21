'use client';
import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../ui/button';

import {
  AdopterProfileFormProgress,
  BasicExperience,
  AvailabilityLocation,
  Bio,
  Documents,
  Review,
} from './adopter-profile-form';

const PetAdopterForm = () => {
  const steps = [
    { key: 'basicExperience', heading: 'Basic Information', component: BasicExperience },
    { key: 'bio', heading: 'Bio', component: Bio },
    { key: 'availabilityLocation', heading: 'Availability & Location', component: AvailabilityLocation },
    { key: 'documents', heading: 'Documents', component: Documents },
    { key: 'review', heading: 'Review', component: Review },
  ];

  const [currentStep, setCurrentStep] = useState(3);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setCurrentStep(prev => {
      setDirection(1);
      return Math.min(prev + 1, steps.length - 1);
    });
  };

  const handleBack = () => {
    setCurrentStep(prev => {
      setDirection(-1);
      return Math.max(prev - 1, 0);
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  const variants = {
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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <AdopterProfileFormProgress steps={steps} currentStep={currentStep} />

      <h1 className="text-3xl font-medium">{steps[currentStep].heading}</h1>
      <div className="flex flex-col gap-5">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>

        <div className="flex w-full justify-end">
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button variant="primary" onClick={handleNext} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetAdopterForm };
