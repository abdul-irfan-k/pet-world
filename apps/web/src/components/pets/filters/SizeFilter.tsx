'use client';

import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface SizeFilterProps {
  onChange?: (value: string[]) => void;
}

const SizeFilter = ({ onChange }: SizeFilterProps) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let updatedSizes: string[];
    if (checked) {
      updatedSizes = [...selectedSizes, value];
    } else {
      updatedSizes = selectedSizes.filter(size => size !== value);
    }
    setSelectedSizes(updatedSizes);
    onChange?.(updatedSizes);
  };

  const sizeOptions = [
    { id: 'small-breed', label: 'Small Breed' },
    { id: 'medium-breed', label: 'Medium Breed' },
    { id: 'large-breed', label: 'Large Breed' },
  ];

  return (
    <div>
      <AccordionItem value="Size">
        <AccordionTrigger>
          <span className="text-[16px] font-medium leading-[24px]">Size</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {sizeOptions.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={selectedSizes.includes(id)}
                  onCheckedChange={checked => handleCheckboxChange(id, !!checked)}
                />
                <label htmlFor={id} className="text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

export { SizeFilter };
