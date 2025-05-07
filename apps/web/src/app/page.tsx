import { PetCard } from '@/components/pets';
import { Footer, Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Video } from '@/components/ui/video/Video';
import { dogs } from '@/lib/data/dummyDogs';

export default function Home() {
  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 py-16">
        {dogs.map(dog => (
          <PetCard key={dog.id} {...dog} />
        ))}
      </div>

      <div className="container mx-auto py-16 ">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Don't miss</h2>

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

        <div className="w-[35%] mt-10 mx-auto flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">Find Your Perfect Pet Match</h1>
          <p className="text-gray-600 mb-3">
            Adopt or rehome pets easily with trust and care.
          </p>

          <div>
            <Button
              variant="primary"
              size="lg"
              className="bg-black text-white "
            >
              Adopt now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
