import React from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

const SizeFilter = () => {
  return (
    <div>
      <AccordionItem value="Size">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">Size</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="small" className="text-[16px] text-gray-700">
                Small
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="medium" className="text-sm text-gray-700">
                Medium
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox />
              <label htmlFor="large" className="text-sm text-gray-700">
                Large
              </label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { SizeFilter };
