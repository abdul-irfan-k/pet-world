import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

interface AdoptionFeeFilterProps {
  onChange?: (value: number[]) => void;
}

const AdoptionFeeFilter = ({ onChange }: AdoptionFeeFilterProps) => {
  const [value, setValue] = useState([0, 500]);
  const [from, to] = value;

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div>
      <AccordionItem value="AdoptionFee">
        <AccordionTrigger>
          <span className="text-[16px] font-medium leading-[24px]">Adoption Fee</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            <div className="mx-auto w-full max-w-sm">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="text-muted-foreground text-sm">$0</span>
                <Slider value={value} onValueChange={handleValueChange} max={1000} step={10} />
                <span className="text-muted-foreground text-sm">$1000</span>
              </div>
              <p className="text-muted-foreground mt-2 text-center text-sm">
                ${from} - ${to}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { AdoptionFeeFilter };
