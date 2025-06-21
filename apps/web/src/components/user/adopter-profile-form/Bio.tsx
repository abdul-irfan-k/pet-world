import React, { useState } from 'react';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@/components/ui/editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});
const Bio = () => {
  const [value, setValue] = useState('');
  return (
    <div className="w-[45vw] space-y-6 rounded-lg border border-gray-300 bg-gray-50 p-10">
      <p className="text-muted-foreground text-sm">
        Share a brief bio about yourself and your interest in pet adoption.
      </p>

      <div className="h-min-[80vh] space-y-4">
        <Editor value={value} onChange={setValue} className="h-full" style={{ height: '50vh' }} />
      </div>
    </div>
  );
};

export { Bio };
