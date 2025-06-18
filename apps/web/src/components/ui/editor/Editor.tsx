import React, { FC } from 'react';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

interface EditorProps extends ReactQuill.ReactQuillProps {}
const Editor: FC<EditorProps> = props => {
  return <ReactQuill {...props} />;
};

export { Editor };
