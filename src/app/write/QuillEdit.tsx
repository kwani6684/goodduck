'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { PostType } from '../lists/page';
import Link from 'next/link';
import aws from 'aws-sdk';
import ReactQuill from 'react-quill';
import Quill from 'react-quill';

export interface CategoryType {
  _id: string;
  value: string;
}

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function Editor({ category }: any) {
  const quillRef = useRef(null);
  let [content, setContent] = useState('');
  let [title, setTitle] = useState('');
  let [thisCategory, setThisCategory] = useState('스포츠⚽️');
  let [data, setData] = useState<PostType[]>([]);
  useEffect(() => {});
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        //생성한 s3 관련 설정들
        aws.config.update({
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
          region: process.env.NEXT_PUBLIC_AWS_REGION,
          signatureVersion: 'v4',
        });
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new aws.S3.ManagedUpload({
          params: {
            Bucket: 'goodduckbucket', //버킷 이름
            Key: `upload/${name}`,
            Body: file,
          },
        });
        //이미지 업로드 후
        //곧바로 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then((res) => res.Location);
        //useRef를 사용해 에디터에 접근한 후
        //에디터의 현재 커서 위치에 이미지 삽입
        const cur = quillRef.current as Quill | null;
        if (cur) {
          const editor = cur.getEditor();
          const range = editor.getSelection();
          if (range) {
            // 가져온 위치에 이미지를 삽입한다
            editor.insertEmbed(range.index, 'image', IMG_URL);
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    console.log(thisCategory);
  }, [thisCategory]);
  // const quillModules = useMemo(() => {
  //   return {
  //     toolbar: {
  //       container:[
  //       [{ header: [1, 2, 3, false] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //
  //       ['image'],
  //       [{ align: [] }],
  //       [{ color: [] }],
  //       ['code-block'],
  //       ['clean'],
  //       ]
  //     },
  //     handlers: {
  //       image: imageHandler,
  //     },
  //   };
  // }, []);
  const quillModules = useMemo(() => {
    return {
      toolbar: {
        container: [[{ header: [1, 2, 3, 4, 5, false] }], ['bold', 'underline'], [{ color: [] }], ['link'], ['image']],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

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
                  console.log(title);
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
                  <ReactQuill
                    ref={quillRef}
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
        <button type='button' className='text-lg font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <Link
          href='/lists'
          onClick={() => {
            fetch(`/api/postContent`, { method: 'POST', body: JSON.stringify({ title: title, category: thisCategory, content: content }) }).then(
              (response) => {
                if (response.ok) {
                  console.log('yaho');
                  // '/lists' 로 페이지 이동하는 코드
                }
              }
            );
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
