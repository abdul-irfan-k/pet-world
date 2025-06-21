import React from 'react';

import { Star } from 'lucide-react';

const ProfileWorkHistory = () => {
  const reviews = [
    {
      id: 1,
      petName: 'Buddy',
      rating: 5,
      reviewText: 'Buddy was a wonderful companion! Very well-behaved and loving.',
      adoptionPeriod: '2025-05-10 - 2025-06-10',
    },
    {
      id: 2,
      petName: 'Whiskers',
      rating: 4,
      reviewText: 'Whiskers was a bit shy at first but warmed up quickly. A great temporary pet.',
      adoptionPeriod: '2025-04-01 - 2025-04-30',
    },
  ];

  return (
    <div className="">
      <h2 className="mb-4 text-xl font-semibold">Temporary Pet Adoption Reviews</h2>
      <div className="gap-15 flex flex-col rounded-lg p-4">
        {reviews.map(review => (
          <div key={review.id} className="last mb-4 pb-4">
            <h3 className="text-lg font-medium">{review.petName}</h3>
            <div className="mt-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            {review.reviewText && <p className="mt-2 text-sm text-gray-700">{review.reviewText}</p>}
            <p className="mt-1 text-xs text-gray-500">Adoption Period: {review.adoptionPeriod}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProfileWorkHistory };
