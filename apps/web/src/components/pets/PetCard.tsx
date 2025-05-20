'use client';
import Image from 'next/image';
import Link from 'next/link';

type PetCardProps = {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  location?: string;
  fee?: number;
  image: string;
  tag?: string; // e.g. "Bestseller", "Just In"
};

const PetCard = ({
  id,
  name,
  breed,
  age,
  gender,
  location = 'Bangalore',
  fee = 50,
  image,
  tag,
}: PetCardProps) => {
  return (
    <Link href={`/pets/profile/${id}`} passHref>
      <div className="w-full cursor-pointer overflow-hidden rounded-lg bg-white transition-shadow duration-300 hover:shadow-md lg:max-w-sm">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="space-y-1 p-3">
          {tag && <p className="text-sm font-semibold text-red-600">{tag}</p>}

          <h2 className="text-base font-medium leading-tight text-gray-900">
            {name} – {breed}
          </h2>

          <p className="text-sm text-gray-600">
            {age} · {gender} · {location}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            Adoption Fee: ₹{fee}
          </p>
        </div>
      </div>
    </Link>
  );
};

export { PetCard };
