// components/Video.tsx
import React from 'react';

type VideoProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
};

const Video: React.FC<VideoProps> = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className = '',
}) => {
  return (
    <video
      className={`h-auto w-full rounded-lg ${className}`}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
    >
      Your browser does not support the video tag.
    </video>
  );
};

export { Video };
