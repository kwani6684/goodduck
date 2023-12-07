'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import acorn from '../../../public/acorn.png';

export default function ImageFromHtml({ content }: { content: string }) {
  const [firstImageURL, setFirstImageURL] = useState<string | null>(null);

  useEffect(() => {
    //게시글의 첫번째 이미지를 가져와 썸네일로
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const firstImg = doc.querySelector('img');

    if (firstImg) {
      const imageURL = firstImg.getAttribute('src');
      setFirstImageURL(imageURL);
      console.log(imageURL);
    }
    else {
      setFirstImageURL(null)
    }
  }, [content]);

  return (
    <div className=' h-[200px] relative dark:bg-neutral-800 rounded-t-2xl flex items-center justify-center'>
      {!firstImageURL ? (
        <Image className=' object-contain max-w-full max-h-full' src={acorn} fill alt='default Image' />
      ) : (
        <Image className=' object-contain max-w-full max-h-full' src={firstImageURL} fill alt='Thumbnail' />
      )}
    </div>
  );
}
