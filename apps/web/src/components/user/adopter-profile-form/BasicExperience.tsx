import React from 'react';

import { Input, Label } from '@/components/ui/form/inputs';
import { Textarea } from '@/components/ui/textarea';

const BasicExperience = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Your Pet Care Experience</h2>
      <p className="text-muted-foreground text-sm">
        Share your relevant experience as a pet adopter or animal caretaker.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="years">Years of Experience</Label>
          <Input id="years" placeholder="e.g., 4" type="number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifications">Certifications (comma-separated)</Label>
          <Input id="certifications" placeholder="e.g., Animal Welfare, Pet Grooming, Behavioral Training" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input id="specialization" placeholder="e.g., Behavioral training for dogs" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">What motivates you to care for pets?</Label>
          <Textarea
            id="motivation"
            rows={4}
            placeholder="e.g., I’ve always had a passion for helping animals in need..."
          />
        </div>
      </div>
    </div>
  );
};

export { BasicExperience };
