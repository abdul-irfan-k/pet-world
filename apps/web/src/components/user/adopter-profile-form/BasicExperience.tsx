import React from 'react';

import { TextAreaField, TextField } from '@/components/ui/form/inputs';

const BasicExperience = () => {
  return (
    <div className="w-[45vw] space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-10">
      <p className="text-muted-foreground text-sm">
        Share your relevant experience as a pet adopter or animal caretaker.
      </p>

      <div className="space-y-4">
        <div className="space-y-3">
          <TextField
            label="How many years of experience do you have caring for pets?"
            placeholder="e.g., 5 years"
            name="experienceYears"
            id="experienceYears"
          />
        </div>

        <div className="space-y-3">
          <TextField
            id="certifications"
            placeholder="e.g., Animal Care Certification, Pet First Aid"
            name="certifications"
            label="Certifications (if any)"
          />
        </div>

        <div className="space-y-3">
          <TextField
            id="specialization"
            placeholder="e.g., Dog Training, Cat Behavior"
            name="specialization"
            label="Specialization (if any)"
          />
        </div>

        <div className="space-y-3">
          <TextField
            id="preferredPets"
            placeholder="e.g., Dogs, Cats, Birds"
            name="preferredPets"
            label="Preferred Pets"
          />
        </div>

        <div className="space-y-3">
          <TextAreaField
            id="motivation"
            placeholder="Share your passion for animal care and what drives you to help pets in need."
            rows={4}
            name="motivation"
            label="Why do you want to be a pet adopter?"
          />
        </div>
      </div>
    </div>
  );
};

export { BasicExperience };
