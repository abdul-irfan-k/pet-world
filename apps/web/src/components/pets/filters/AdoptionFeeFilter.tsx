import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

const AdoptionFeeFilter = () => {
  const [value, setValue] = useState([0, 500]);
  const [from, to] = value;

  return (
    <div>
      <AccordionItem value="AdoptionFee">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">
            Adoption Fee
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">$0</span>
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={1000}
                  step={10}
                />
                <span className="text-sm text-muted-foreground">$1000</span>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
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
