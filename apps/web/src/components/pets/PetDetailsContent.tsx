import React, { FC } from 'react';

import { useRouter } from 'next/navigation';

import { Check, X } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';

import { PetPrimaryInfo } from './PetPrimaryInfo';

interface PetDetailsContentProps {
  //eslint-disable-next-line
  pet: any;
}
const PetDetailsContent: FC<PetDetailsContentProps> = ({ pet }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-col space-y-6 lg:w-[400px]">
        <PetPrimaryInfo {...pet} />

        <div>
          <p className="text-sm text-gray-600">Adoption Fee</p>
          <p className="text-xl font-semibold">£{pet.adoptionFee}</p>
          <p className="text-xs text-gray-500">(3% platform fee included)</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant={'black'}
            size={'xl'}
            fullWidth
            className="rounded-full"
            onClick={() => router.push(`/pet-care/proposals/${pet.id}/add`)}
          >
            Request to adopt
          </Button>
          <Button
            variant={'outline'}
            size={'xl'}
            fullWidth
            className="rounded-full"
          >
            Add to wishlist
          </Button>
        </div>

        <div className="text-[20px] font-medium leading-[24px]">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['Personality', 'Activity', 'Diet']}
          >
            <AccordionItem value="Personality" className="border-none py-3">
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span className="">Personality</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 text-[16px] leading-7 text-gray-700">
                  <p>{pet.personality}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Activity" className="border-none py-3">
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span className="">Activity & Play</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 text-[16px] leading-7 text-gray-700">
                  <p>{pet.activity}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Diet" className="border-none py-3">
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span className="">Diet</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 text-[16px] leading-7 text-gray-700">
                  <p>{pet.diet}</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="HomeLife" className="border-none py-3">
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span className="">Current Home Life</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 flex flex-col gap-4">
                  <div className="rounded-lg bg-gray-200 p-3">
                    <p className="text-sm text-gray-600">Household Activity</p>
                    <p className="font-medium">{pet.homeLife?.activity}</p>
                  </div>
                  <div className="rounded-lg bg-gray-200 p-3">
                    <p className="text-sm text-gray-600">Environment</p>
                    <p className="font-medium">{pet.homeLife?.environment}</p>
                  </div>
                  <div className="rounded-lg bg-gray-200 p-3">
                    <p className="text-sm text-gray-600">Other Pets</p>
                    <p className="font-medium">{pet.homeLife?.otherPets}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="OwnerDescription"
              className="border-none py-3"
            >
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span>{"Owner's Description"}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {//eslint-disable-next-line
                  pet.ownerDescription?.map((desc: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      {desc.positive ? (
                        <Check
                          size={18}
                          className="flex-shrink-0 text-green-500"
                        />
                      ) : (
                        <X size={18} className="flex-shrink-0 text-red-500" />
                      )}
                      <span className="text-gray-700">{desc.text}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="MedicalInformation"
              className="border-none py-3"
            >
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span>Medical Information</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="flex items-center gap-2">
                    {pet.medicalInfo?.fleaTreatment ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                    <span>Flea Treatment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pet.medicalInfo?.dentalChecks ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                    <span>Dental Checks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {pet.medicalInfo?.medication ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                    <span>Current Medication</span>
                  </div>
                  {pet.medicalInfo?.medication &&
                    pet.medicalInfo?.medicationDetails && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">
                          Medication Details
                        </p>
                        <p>{pet.medicalInfo.medicationDetails}</p>
                      </div>
                    )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="AdditionalDetails"
              className="border-none py-3"
            >
              <AccordionTrigger className="text-[20px] font-medium leading-[24px]">
                <span>Additional Details</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-6 rounded-lg bg-gray-200 p-4">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <p className="text-sm text-gray-600">
                        Time at current home
                      </p>
                      <p className="font-medium">{pet.timeAtCurrentHome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Reason for rehoming
                      </p>
                      <p className="font-medium">{pet.rehomingReason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Duration until rehoming needed
                      </p>
                      <p className="font-medium">{pet.keepDuration}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export { PetDetailsContent };
