'use client';
import { UpdatePetForm } from '@/components/pets';

interface EditPetPageProps {
  params: {
    petId: string;
  };
}

export default function EditPetPage({ params }: EditPetPageProps) {
  const { petId } = params;

  return (
    <div className="w-full">
      <UpdatePetForm petId={petId} />
    </div>
  );
}
