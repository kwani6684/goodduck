'use client';
import { useEffect, useState } from 'react';
import ListPreview from './ListPreview';
import { PostType } from './page';

interface ListPagenationProps {
  post: PostType[]; // post 속성을 명시
}

export default function ListPagenation({ post }: ListPagenationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 각 페이지당 아이템 수
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let itemsToShow = post.slice(startIndex, endIndex);

  return (
    <div>
      <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
        {itemsToShow.map((item: PostType, i: number) => (
          <ListPreview {...item} key={i} />
        ))}
      </div>
      <div className='flex justify-center mt-10'>
        <button
          className='mr-4 hover:bg-yellow-800 hover:text-white hover:rounded-xl'
          onClick={() => {
            setCurrentPage(currentPage - 1);
            console.log(itemsToShow);
          }}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-4 '>
          {currentPage}
        </span>
        <button
          className='ml-4 hover:bg-yellow-800 hover:text-white hover:rounded-xl'
          onClick={() => {
            setCurrentPage(currentPage + 1);
            console.log(itemsToShow);
          }}
          disabled={endIndex >= post.length}
        >
          다음
        </button>
      </div>
    </div>
  );
}
