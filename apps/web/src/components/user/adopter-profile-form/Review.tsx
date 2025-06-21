'use client';
import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { PetAdopterProfile } from '@/types/PetAdopter';

const Editor = dynamic(() => import('@/components/ui/editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});
interface ReviewProps {
  setStepIndex: (index: number) => void;
}

const Review: React.FC<ReviewProps> = ({ setStepIndex }) => {
  const { getValues } = useFormContext();
  const [formData, setFormData] = useState<PetAdopterProfile | null>(null);

  useEffect(() => {
    const values = getValues() as PetAdopterProfile;
    setFormData(values);
  }, []);

  const renderSection = (key: string, value: any = '-') => {
    return (
      <div key={key} className="space-y-1">
        <span className="font-medium capitalize text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
        <div className="w-full whitespace-pre-wrap rounded-md border border-gray-300 bg-white p-3 text-gray-900 shadow-sm">
          {value || '-'}
        </div>
      </div>
    );
  };

  if (!formData) return null;

  return (
    <div className="w-[45vw] space-y-6">
      <p className="text-muted-foreground text-sm">Review the information you have entered before submitting.</p>

      <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <Button variant="link" onClick={() => setStepIndex(0)}>
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          {renderSection('yearOfExperience', formData.yearOfExperience)}
          {renderSection('certifications', formData.certifications)}
          {renderSection('specialization', formData.overview?.specialization)}
          {renderSection('preferredPets', formData.overview?.preferredPets)}
          {renderSection('motivation', formData.overview?.motivation)}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bio</h2>
          <Button variant="link" onClick={() => setStepIndex(1)}>
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          <Editor
            value={formData.overview?.bio || ''}
            readOnly
            modules={{ toolbar: false }}
            className="min-h-40 w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Availability & Location</h2>
          <Button variant="link" onClick={() => setStepIndex(2)}>
            Edit
          </Button>
        </div>
        <div className="space-y-2">
          {renderSection('city', formData.overview?.location?.city)}
          {renderSection('state', formData.overview?.location?.state)}
          {renderSection('country', formData.overview?.location?.country)}
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Documents</h2>
          <Button variant="link" onClick={() => setStepIndex(3)}>
            Edit
          </Button>
        </div>
        <div className="space-y-2">{renderSection('adharNumber', formData.adharNumber)}</div>
      </div>
    </div>
  );
};

export { Review };
