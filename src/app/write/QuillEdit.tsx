'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 
import { PostType } from '../lists/page';
import Link from 'next/link';

export interface CategoryType {
  _id: string;
  value: string;
}

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({ category }: any) {
  let [content, setContent] = useState('');
  let [title, setTitle] = useState('');
  let [thisCategory, setThisCategory] = useState('스포츠⚽️');
  let [data, setData] = useState<PostType[]>([]);

  
  useEffect(() => {
    console.log(thisCategory);
},[thisCategory])
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

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    console.log(content);
  };
  

  return (
    <div>
      <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <div className='sm:col-span-4'>
          <label htmlFor='postTitle' className='block text-sm font-medium leading-6 text-gray-900'>
            Title
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>
              <input
                onChange={(e) => {
                  setTitle(e.currentTarget.value);
                  console.log(title)
                  
                }}
                type='text'
                name='title'
                id='title'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='title'
              />
            </div>
          </div>
        </div>
        <div className='sm:col-span-2'>
          <label htmlFor='postTitle' className='block text-sm font-medium leading-6 text-gray-900'>
            Category
          </label>
          <div className='mt-2'>
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
              <span className='flex select-none items-center pl-3 text-gray-500 sm:text-sm'></span>

              <select
                onChange={(e) => {
                  
                  setThisCategory(e.currentTarget.value);

                }}
                name='category'
                id='category'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
              >
                {category.map((item: CategoryType, i: number) => {
                  return (
                    <option key={i} value={item.value}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className='col-span-full'>
          <label htmlFor='postContent' className='block text-sm font-medium leading-6 text-gray-900'>
            Content
          </label>
          <div className='mt-2'>
            <div className=' block w-full flex-col rounded-md text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
              <div className='flex flex-col items-center'>
                <div className='h-[400px] w-full'>
                  <QuillEditor
                    value={content}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    className='w-full h-[70%] bg-white'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='editor' className='col-span-1'></div>
      </div>

      <div className='mb-10 flex items-center justify-center gap-x-6'>
        <button
          
          type='button' className='text-lg font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <Link
          href='/lists'
          onClick={() => {
            fetch(`/api/postContent`, { method: "POST", body: JSON.stringify({ title: title, category: thisCategory,content:content }) }).then((response) => {
              if (response.ok) {
                console.log("yaho")
             // '/lists' 로 페이지 이동하는 코드
              }
            });
          }}
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Submit
        </Link>
      </div>
    </div>
  );
}
