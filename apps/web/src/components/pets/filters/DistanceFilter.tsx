import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';

const DistanceFilter = () => {
  const [value, setValue] = useState([0, 50]);
  const [from, to] = value;

  return (
    <div>
      <AccordionItem value="Distance">
        <AccordionTrigger>
          <span className="text-[16px] leading-[24px] font-medium">
            Show pets within
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 ">
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">0 km</span>
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={100}
                  step={1}
                />
                <span className="text-sm text-muted-foreground">100 km</span>
              </div>
              <p className="mt-2 text-center text-sm text-muted-foreground">
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
