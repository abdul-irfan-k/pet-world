import React, { FC } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface AdopterProfileFormProgressProps {
  steps: { heading: string }[];
  currentStep: number;
}
const AdopterProfileFormProgress: FC<AdopterProfileFormProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl items-center justify-between gap-4 px-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className={cn('relative flex w-full flex-col items-center', index === steps.length - 1 ? 'w-fit' : '')}
          >
            <div className="relative flex w-full items-center gap-4">
              <div className="relative">
                <motion.div
                  className={cn(
                    'z-10 aspect-square h-6 rounded-full border-2',
                    isCompleted ? 'border-brand-500' : isActive ? 'border-brand-500' : 'border-gray-300',
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{
                    backgroundColor: isCompleted ? '#9E77ED' : '#ffffff',
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div
                  className={
                    'absolute left-[50%] top-8 w-fit translate-x-[-50%] text-center text-sm ' +
                    (isActive ? 'font text-black' : 'text-gray-400')
                  }
                >
                  {step.heading}
                </div>
              </div>
              {index + 1 < steps.length && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-brand-500 h-1 w-full origin-left rounded"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { AdopterProfileFormProgress };
