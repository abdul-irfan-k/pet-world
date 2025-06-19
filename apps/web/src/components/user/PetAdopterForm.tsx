'use client';
import React, { useState } from 'react';

import { Button } from '../ui/button';

import {
  AdopterProfileFormProgress,
  BasicExperience,
  AvailabilityLocation,
  Bio,
  Documents,
  PetPreferences,
  Review,
} from './adopter-profile-form';

const PetAdopterForm = () => {
  const steps = ['Basic Experience', 'Preferred Pets', 'Availability & Location', 'Documents', 'Review'];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <AdopterProfileFormProgress steps={steps} currentStep={currentStep} />

      <div>
        {currentStep === 0 && <BasicExperience />}
        {currentStep === 1 && <PetPreferences />}
        {currentStep === 2 && <AvailabilityLocation />}
        {currentStep === 3 && <Documents />}
        {currentStep === 4 && <Bio />}
        {currentStep === 5 && <Review />}

        <div className="flex w-full justify-end">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetAdopterForm };
