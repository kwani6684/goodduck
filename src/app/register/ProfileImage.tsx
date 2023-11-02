'use client';

import { useState } from 'react';

export default function ProfileImage() {
  let [src, setSrc] = useState('');
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

            let res = await fetch(`api/postProfileImage?file=${filename}`);
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
                  fetch('api/register')
              } else {
                console.log('실패');
              }
            }
            // ...
          }
        }}
      />
      <img src={src} />
    </div>
  );
}
