import React, { FC } from 'react';

import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

const Editor: FC<ReactQuill.ReactQuillProps> = props => {
  return <ReactQuill {...props} />;
};

export { Editor };
