'use client';
import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { SearchIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinnner';
import { ProfileHeader, ProfileInfo, ProfileBookAdoption, ProfileWorkHistory } from '@/components/user/profile';
import { useGetPetAdopterPublicProfileQuery } from '@/lib/api/userApi';
import { PetAdopterProfile } from '@/types/PetAdopter';

const bio = `
<h2><strong>🐾 Top Rated Pet Adopter & Certified Animal Care Specialist</strong></h2>

<p>
  I am a passionate and experienced pet adopter offering professional care for your furry, feathered, or scaled companions. With verified documents and a commitment to ethical pet care, I ensure your pets are loved, safe, and well looked after.
</p>


<h3><strong>✨ Highlights</strong></h3>
<ul>
  <li>✔ Trusted by 50+ pet owners across Karnataka</li>
  <li>✔ 4+ years of experience in pet care, grooming, and training</li>
  <li>✔ Certified in Animal Welfare, Grooming & Behavioral Training</li>
  <li>✔ Verified ID & document proofs (Aadhaar, Certificates)</li>
  <li>✔ 5-star ratings from all pet owners</li>
</ul>

<h3><strong>🐶 Services I Offer</strong></h3>
<ul>
  <li>✔ Pet Boarding & Sitting</li>
  <li>✔ Dog Walking & Exercise</li>
  <li>✔ Administering Medication & Special Needs Care</li>
  <li>✔ Behavioral Training (Dogs, Cats, Birds)</li>
  <li>✔ Daily Updates via WhatsApp (Photos & Videos)</li>
</ul>

<h3><strong>📍 Availability & Location</strong></h3>
<ul>
  <li>📆 Available: Saturdays & Sundays (9 AM – 5 PM)</li>
  <li>📍 Based in Uppinangady, Karnataka, India</li>
  <li>🗣 Languages: Kannada, English, Hindi</li>
</ul>

<h3><strong>💡 Why Choose Me?</strong></h3>
<ol>
  <li>I treat every pet as my own family.</li>
  <li>I’m highly responsive and punctual.</li>
  <li>I provide flexible scheduling and doorstep support.</li>
  <li>I believe in building lasting trust with every pet parent.</li>
</ol>

`;

const UserProfilePage = () => {
  const userId = useParams().userId as string;

  const { data, isLoading } = useGetPetAdopterPublicProfileQuery(userId);
  console.log('user profile', data);

  const dummyPetAdopter: PetAdopterProfile = {
    //eslint-disable-next-line
    //@ts-ignore
    documents: {
      aadhaar: {
        name: 'Aadhaar Card',
        url: 'https://example.com/uploads/aadhaar.pdf',
      },
      certificate: {
        name: 'Animal Care Certification',
        url: 'https://example.com/uploads/certificate.pdf',
      },
    },
    certifications: ['Animal Welfare', 'Pet Grooming'],
    //eslint-disable-next-line
    //@ts-ignore
    overview: {
      bio,
      motivation: 'Ensuring every pet has a loving home.',
      specialization: 'Behavioral training for dogs.',
      preferredPets: ['Dogs', 'Birds'],
      location: {
        city: 'Uppinangady',
        state: 'Karnataka',
        country: 'India',
      },
      availability: {
        days: ['Saturday', 'Sunday'],
        time: '9am - 5pm',
      },
    },

    // eslint-disable-next-line
    //@ts-ignore
    ...data?.data.petAdopter,
  };

  if (isLoading) {
    return (
      <div className="px-15">
        Loading...
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="px-15">
        <ProfileHeader
          name={'John Doe'}
          userName="johndoe"
          userId="12345"
          isVerified={true}
          location="New York, USA"
          profilePicture="/default-profile.png"
          //eslint-disable-next-line
          //@ts-ignore
          {...data?.data.petAdopter.user}
        />
        <div>
          <ProfileInfo
            adopter={dummyPetAdopter}
            adoption={{
              totalPetsAdopted: 10,
              totalAdoptionDuration: '5 years',
              highlightSection: 'Expert in dog training and care.',
              adoptedPetTypesBreeds: 'Golden Retrievers, Beagles, Parrots',
            }}
          />
        </div>
        <div className="pl-98">
          <ProfileBookAdoption />
          <ProfileWorkHistory />
        </div>

        <div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Search for temporary homes</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search adopters"
                  className="w-full rounded-md border border-gray-300 px-4 py-2"
                />
                <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Browse available pets</h3>
              <ul>
                <li>
                  <Link href="/pets" className="text-green-600 hover:underline">
                    All Pets
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                    Dogs
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=cat" className="text-green-600 hover:underline">
                    Cats
                  </Link>
                </li>
                <li>
                  <Link href="/pets?location=nearby" className="text-green-600 hover:underline">
                    Pets Near Me
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-2 text-lg font-semibold">Browse available pets</h3>
              <ul>
                <li>
                  <Link href="/pets" className="text-green-600 hover:underline">
                    All Pets
                  </Link>
                </li>
                <li>
                  <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                    Dogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Find a temporary pet</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Link href="/pets?type=dog" className="text-green-600 hover:underline">
                  Find a Temporary Dog Home
                </Link>
              </div>
              <div>
                <Link href="/pets?type=cat" className="text-green-600 hover:underline">
                  Find a Temporary Cat Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
