'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ImageFromHtml({ content }: { content: string }) {
  const [firstImageURL, setFirstImageURL] = useState<string | null>(null);

  useEffect(() => {
    // HTML 문자열을 DOM으로 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // 첫 번째 img 태그를 선택
    const firstImg = doc.querySelector('img');

    if (firstImg) {
      // 이미지 URL을 추출
      const imageURL = firstImg.getAttribute('src');
      setFirstImageURL(imageURL);
    }
  }, [content]);

  return (
    <div className='pb-2 h-[200px] dark:bg-neutral-800 rounded-2xl flex items-center justify-center'>
      {firstImageURL && (
        <img className=' object-fill max-w-full max-h-full' src={firstImageURL} alt='Thumbnail' />
      )}
    </div>
  );
}
