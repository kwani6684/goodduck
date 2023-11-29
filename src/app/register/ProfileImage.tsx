'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageType{
  types: string,
  image:string,
}
export default function ProfileImage({types,image}:ProfileImageType) {
  let [src, setSrc] = useState(image);
  return (
    <div>
      <input
        id='profileImage'
        name='profileImage'
        type='file'
        accept='image/*'
        onChange={async (e) => {
          while (e.currentTarget?.files) {
            let file = e.currentTarget.files[0];
            let filename = encodeURIComponent(file.name);

            let res = await fetch(`/api/postProfileImage?file=${filename}`);
            let resData = await res.json();

            if ('fields' in resData && 'url' in resData) {
              const { fields, url } = resData;
              const formData = new FormData();
              Object.entries({ ...fields, file }).forEach(([key, value]) => {
                if (typeof value === 'string') {
                  formData.append(key, value);
                } else if (value instanceof Blob) {
                  formData.append(key, value, file.name);
                }
              });
              let response = await fetch(url, {
                method: 'POST',
                body: formData,
              });

              console.log(response);

              if (response.ok) {
                setSrc(url + '/' + filename);
                fetch(`/api/${types}`);
              } else {
                console.log('실패');
              }
            }
            // ...
          }
        }}
      />
      <div className='items-center'>
        <Image width={50} height={50} src={src} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[50px] h-[50px]' alt='Avatar' />
      </div>
    </div>
  );
}
