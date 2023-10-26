'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor() {
  const [content, setContent] = useState('');

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newContent: any) => {
      setContent(newContent);
      console.log(content)
  };

  return (
    <div className=' block w-full flex-col rounded-md text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
      <div className='flex flex-col items-center'>
        <div className='h-[400px] w-full'>
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className='w-full h-full bg-white'
          />
        </div>
      </div>
    </div>
  );
}
