'use client';

import React, { useState } from 'react';

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface SpeciesFilterProps {
  onChange?: (value: string[]) => void;
}

const SpeciesFilter = ({ onChange }: SpeciesFilterProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let updatedSpecies: string[];
    if (checked) {
      updatedSpecies = [...selectedSpecies, value];
    } else {
      updatedSpecies = selectedSpecies.filter(species => species !== value);
    }
    setSelectedSpecies(updatedSpecies);
    onChange?.(updatedSpecies);
  };

  const speciesList = [
    { id: 'dog', label: 'Dog' },
    { id: 'cat', label: 'Cat' },
    { id: 'rabbit', label: 'Rabbit' },
  ];

  return (
    <AccordionItem value="Species">
      <AccordionTrigger>
        <span className="text-[16px] font-medium leading-[24px]">Species</span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-2">
          {speciesList.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={selectedSpecies.includes(id)}
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

export { SpeciesFilter };
