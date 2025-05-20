'use client';
import { useParams } from 'next/navigation';

import { UpdatePetForm } from '@/components/pets';

export default function EditPetPage() {
  const params = useParams();
  const petId = params.petId as string;

  return (
    <div className="w-full">
      <UpdatePetForm petId={petId} />
    </div>
  );
}
