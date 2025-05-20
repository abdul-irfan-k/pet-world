import path from 'path';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const supportedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ];
  const supportedVideoTypes = [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/webm',
  ];

  const isImage = supportedImageTypes.includes(file.mimetype);
  const isVideo = supportedVideoTypes.includes(file.mimetype);

  if (file.fieldname === 'profile' && isImage) {
    cb(null, true);
  } else if (
    (file.fieldname === 'petImages' || file.fieldname === 'petVideos') &&
    (isImage || isVideo)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export { upload };
