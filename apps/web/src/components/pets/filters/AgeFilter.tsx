import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

const AgeFilter = () => {
  const [value, setValue] = useState([0, 6]);
  const [from, to] = value;

  return (
    <div>
      <AccordionItem value="Age">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">Age</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">0</span>
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={10}
                  step={0.1}
                />
                <span className="text-sm text-muted-foreground">10</span>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
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
