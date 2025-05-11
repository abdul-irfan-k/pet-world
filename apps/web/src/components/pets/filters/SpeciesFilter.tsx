import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

const SpeciesFilter = () => {
  return (
    <div>
      <AccordionItem value="Species">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">
            Species
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="dog" className="text-[16px]  text-gray-700">
                Dog
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="cat" className="text-sm text-gray-700">
                Cat
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="cat" className="text-sm text-gray-700">
                Rabbit
              </label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { SpeciesFilter };
