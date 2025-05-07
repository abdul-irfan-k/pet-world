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
};

const PetCard = ({
  name,
  breed,
  age,
  gender,
  location,
  fee,
  image,
}: PetCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {name} – {breed}
        </h2>
        <p className="text-sm text-gray-600">
          {age} · {gender} · {location}
        </p>
        <p className="text-sm text-gray-800 font-medium mt-1">
          Adoption Fee: ₹{fee}
        </p>

        <span className="mt-2 inline-block text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full w-max">
          Verified Owner
        </span>

        <button className="mt-4 text-sm font-medium text-blue-600 hover:underline w-fit">
          View Details →
        </button>
      </div>
    </div>
  );
};

export { PetCard };
