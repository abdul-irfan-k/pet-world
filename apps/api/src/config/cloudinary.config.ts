import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from './env.config';

dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const CLOUDINARY_UPLOAD_PRESETS = {
  USER_PROFILE: 'user_profile_preset',
  PET_IMAGES: 'pet_images_preset',
  PET_VIDEOS: 'pet_videos_preset',
};

export { cloudinary, CLOUDINARY_UPLOAD_PRESETS };
