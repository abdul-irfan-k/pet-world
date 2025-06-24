'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';

import { useAddPetToFavoritesMutation, useRemovePetFromFavoritesMutation } from '../../lib/api/petsApi';

import { useDebounce } from '@/hooks/useDebounce';

type PetCardProps = {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  images: string[];
  adoptionRequest: {
    amount: string;
    location: {
      city: string;
      state?: string;
      country?: string;
    };
  };
  tag?: string;
  isFavorited?: boolean;
};

const PetCard = ({ id, name, breed, age, gender, images, adoptionRequest, tag, isFavorited = false }: PetCardProps) => {
  const queryClient = useQueryClient();
  const [favorited, setFavorited] = useState(isFavorited);

  const { mutate: addToFavorites, isPending: isAddingToFavorites } = useAddPetToFavoritesMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isPetFavorited', id] });
      queryClient.invalidateQueries({ queryKey: ['favoritePets'] });
    },
  });

  const { mutate: removeFromFavorites, isPending: isRemovingFromFavorites } = useRemovePetFromFavoritesMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isPetFavorited', id] });
      queryClient.invalidateQueries({ queryKey: ['favoritePets'] });
    },
  });

  const debouncedFavorite = useDebounce((nextState: boolean) => {
    if (nextState) {
      addToFavorites(id);
    } else {
      removeFromFavorites(id);
    }
  }, 2000);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextState = !favorited;
    setFavorited(nextState);
    debouncedFavorite(nextState);
  };

  return (
    <Link href={`/pets/profile/${id}`} passHref>
      <div className="relative w-full cursor-pointer overflow-hidden rounded-lg bg-white transition-shadow duration-300 hover:shadow-md lg:max-w-sm">
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={handleFavoriteToggle}
            className="rounded-full p-1.5 transition-colors"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            disabled={isAddingToFavorites || isRemovingFromFavorites}
          >
            <Heart
              className="h-6 w-6"
              fill={favorited ? 'white' : 'none'}
              stroke={!favorited ? 'white' : 'currentColor'}
            />
          </button>
        </div>

        <div className="relative aspect-square w-full">
          <Image src={images[0]} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        <div className="space-y-1 p-3">
          {tag && <p className="text-sm font-semibold text-red-600">{tag}</p>}

          <h2 className="text-base font-medium leading-tight text-gray-900">
            {name} – {breed}
          </h2>

          <p className="text-sm text-gray-600">
            {age} years · {gender} · {adoptionRequest?.location?.city}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">Adoption Fee: {adoptionRequest.amount}</p>
        </div>
      </div>
    </Link>
  );
};

export { PetCard };
