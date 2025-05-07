import { PetCard } from '@/components/pets';
import { Footer, Header } from '@/components/shared';
import { dogs } from '@/lib/data/dummyDogs';

export default function Home() {
  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 ">
        {dogs.map(dog => (
          <PetCard key={dog.id} {...dog} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
