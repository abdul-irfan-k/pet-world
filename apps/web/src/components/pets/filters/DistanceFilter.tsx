import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

interface DistanceFilterProps {
  onChange?: (value: number[]) => void;
}
const DistanceFilter = ({ onChange }: DistanceFilterProps) => {
  const [value, setValue] = useState([0, 50]);
  const [from, to] = value;

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div>
      <AccordionItem value="Distance">
        <AccordionTrigger>
          <span className="text-[16px] font-medium leading-[24px]">Show pets within</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <div className="mx-auto w-full max-w-sm">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-muted-foreground text-sm">0 km</span>
                <Slider value={value} onValueChange={handleValueChange} max={100} step={1} />
                <span className="text-muted-foreground text-sm">100 km</span>
              </div>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                {from} km - {to} km
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { DistanceFilter };
