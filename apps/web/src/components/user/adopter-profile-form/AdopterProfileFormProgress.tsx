import React, { FC } from 'react';

import { cn } from '@/lib/utils';

interface AdopterProfileFormProgressProps {
  steps: string[];
  currentStep: number;
}
const AdopterProfileFormProgress: FC<AdopterProfileFormProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between px-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="relative flex flex-1 flex-col items-center">
            {index > 0 && (
              <div
                className={cn('absolute left-0 top-1/2 h-0.5 w-full', isCompleted ? 'bg-brand-500' : 'bg-gray-300')}
              />
            )}

            <div
              className={cn(
                'z-10 h-5 w-5 rounded-full border-2 transition-all',
                isCompleted
                  ? 'bg-brand-500 border-brand-500'
                  : isActive
                    ? 'border-brand-500 bg-white'
                    : 'border-gray-300 bg-white',
              )}
            />

            <p className={cn('mt-2 text-center text-sm', isActive ? 'font-semibold text-black' : 'text-gray-400')}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export { AdopterProfileFormProgress };
