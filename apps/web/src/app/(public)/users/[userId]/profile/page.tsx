import React from 'react';

import { ProfileHeader } from '@/components/user/profile';

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
      </div>
    </div>
  );
};

export default UserProfilePage;
