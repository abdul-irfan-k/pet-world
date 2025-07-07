import React from 'react';

import { Skeleton } from '../ui/skeleton';

const PetSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="aspect-square w-full" />

          <div className="space-y-1 py-2">
            <Skeleton className="h-4 w-1/4 rounded-sm" />
            <Skeleton className="h-5 w-2/3 rounded" />
            <Skeleton className="h-4 w-1/2 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export { PetSkeletonGrid };
