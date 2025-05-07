import React, { FC } from 'react';
import NextVideoPlayer from 'next-video';

interface VideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
}
const Video: FC<VideoProps> = ({ src, ...props }) => {
  return <NextVideoPlayer src={src} {...props} />;
};

export { Video };
