import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

interface AgeFilterProps {
  onChange?: (value: number[]) => void;
}
const AgeFilter = ({ onChange }: AgeFilterProps) => {
  const [value, setValue] = useState([0, 6]);
  const [from, to] = value;

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onChange?.(newValue);
  };
  return (
    <div>
      <AccordionItem value="Age">
        <AccordionTrigger>
          <span className="text-[16px] font-medium leading-[24px]">Age</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <div className="mx-auto w-full max-w-sm">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-muted-foreground text-sm">0</span>
                <Slider value={value} onValueChange={handleValueChange} max={10} step={0.1} />
                <span className="text-muted-foreground text-sm">10</span>
              </div>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                {from} - {to}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { AgeFilter };
