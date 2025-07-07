'use client';

import { PetCard, PetSkeletonGrid } from '@/components/pets';
import { Footer, Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Video } from '@/components/ui/video';
import { useGetAdoptionRequestedPetsQuery } from '@/lib/api/petsApi';

export default function Home() {
  const { data: petsData, isLoading } = useGetAdoptionRequestedPetsQuery();

  const pets = petsData?.data.pets;

  return (
    <div>
      <Header />
      <div className="block h-40 w-screen"></div>

      {(isLoading || !pets) && (
        <div className="px-4 py-16">
          <PetSkeletonGrid />
        </div>
      )}
      {pets && (
        <div className="grid grid-cols-1 gap-6 p-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {!isLoading && pets?.map(pet => <PetCard key={pet.id} {...pet} />)}
        </div>
      )}

      <div className="container mx-auto py-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">{"Don't miss"}</h2>

          <div>
            <Video
              src="https://res.cloudinary.com/dl9ibkuyg/video/upload/v1746609703/lhu5ndy4vxlibbgkxr2e.mp4"
              autoPlay
              muted
              controls={false}
              loop
            />
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-[35%] flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Find Your Perfect Pet Match</h1>
          <p className="mb-3 text-gray-600">Adopt or rehome pets easily with trust and care.</p>

          <div>
            <Button variant="primary" size="lg" className="bg-black text-white">
              Adopt now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
