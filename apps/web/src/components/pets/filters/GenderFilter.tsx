import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

const GenderFilter = () => {
  return (
    <div>
      <AccordionItem value="Gender">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">Gender</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="male" className="text-[16px] text-gray-700">
                Male
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="female" className="text-sm text-gray-700">
                Female
              </label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { GenderFilter };
