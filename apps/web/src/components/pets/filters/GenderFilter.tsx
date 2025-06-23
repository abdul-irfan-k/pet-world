'use client';

import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface GenderFilterProps {
  onChange?: (value: string[]) => void;
}

const GenderFilter = ({ onChange }: GenderFilterProps) => {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let updatedGenders: string[];
    if (checked) {
      updatedGenders = [...selectedGenders, value];
    } else {
      updatedGenders = selectedGenders.filter(g => g !== value);
    }
    setSelectedGenders(updatedGenders);
    onChange?.(updatedGenders);
  };

  const genderOptions = [
    { id: 'male', label: 'Male' },
    { id: 'female', label: 'Female' },
  ];

  return (
    <AccordionItem value="Gender">
      <AccordionTrigger>
        <span className="text-[16px] font-medium leading-[24px]">Gender</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {genderOptions.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selectedGenders.includes(id)}
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
  );
};

export { GenderFilter };
