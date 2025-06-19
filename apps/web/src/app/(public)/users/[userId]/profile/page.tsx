'use client';
import React from 'react';

import { ProfileHeader, ProfileInfo, ProfileBookAdoption } from '@/components/user/profile';
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
const dummyPetAdopter: PetAdopterProfile = {
  id: 'ckz123abc456',
  userId: 'usr123abc456',
  adharNumber: '1234-5678-9012',
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
  yearOfExperience: 4,
  certifications: ['Animal Welfare', 'Pet Grooming'],
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
  createdAt: '2024-06-01T12:34:56Z',
  updatedAt: '2024-06-10T08:00:00Z',
  isDeleted: false,
};

const UserProfilePage = () => {
  return (
    <div>
      <div className="px-15">
        <ProfileHeader
          name="John Doe"
          userName="johndoe"
          userId="12345"
          isVerified={true}
          location="New York, USA"
          profilePicture="/default-profile.png"
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
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
