import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Label, TextField } from '@/components/ui/form/inputs';

const Documents = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="w-[45vw] space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-10">
      <p className="text-muted-foreground text-sm">Upload verification documents.</p>

      <div className="space-y-4">
        <div className="space-y-3">
          <TextField
            id="adharNumber"
            label="Aadhaar Number"
            placeholder="Enter your Aadhaar Number"
            type="text"
            {...register('adharNumber', { required: 'Adhar number is required' })}
            //eslint-disable-next-line
            //@ts-ignore
            error={errors?.experienceYears?.message}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <Label htmlFor="aadhaar">Upload your Aadhaar Card</Label>
          <input type="file" id="aadhaar" name="documents.aadhaar" accept=".pdf,.jpg,.png" required />
        </div>

        <div className="flex flex-col space-y-3">
          <Label className="text-muted-foreground text-sm" htmlFor="certificate">
            Upload any relevant pet care certification or training documents.
          </Label>
          <input type="file" id="certificate" name="documents.certificate" accept=".pdf,.jpg,.png" required />
        </div>
      </div>
    </div>
  );
};

export { Documents };
