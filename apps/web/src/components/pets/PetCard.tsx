'use client';
import Image from 'next/image';

type PetCardProps = {
  name: string;
  breed: string;
  age: string;
  gender: string;
  location: string;
  fee: number;
  image: string;
  tag?: string; // e.g. "Bestseller", "Just In"
};

const PetCard = ({
  name,
  breed,
  age,
  gender,
  location,
  fee,
  image,
  tag,
}: PetCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 max-w-sm">
      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-3 space-y-1">
        {tag && <p className="text-sm text-red-600 font-semibold">{tag}</p>}

        <h2 className="text-base text-gray-900 font-medium leading-tight">
          {name} – {breed}
        </h2>

        <p className="text-sm text-gray-600">
          {age} · {gender} · {location}
        </p>

        <p className="text-sm text-gray-900 font-semibold mt-1">
          Adoption Fee: ₹{fee.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export { PetCard };
