'use client';
import { useEffect, useState } from 'react';
import { CategoryType } from '../writev2/page';

export default function AddCategory() {
  let [category, setCategory] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/category/getCategory')
      .then((r) => r.json())
      .then((result) => setData(result));
  }, []);
  return (
    <div>
      <div className='py-12 px-12 lg:px-80 md:px-30'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h4 className='text-base pt-4 font-semibold leading-7 text-gray-900'>카테고리를 추가해주세염</h4>
          <p className='mt-1 text-sm leading-6 text-gray-600'>tip. 글쓰기 원하는 카테고리 + 이모지 형태로 추가해주세요 ex) 스포츠⚽️ </p>
          <input
            onChange={(e) => {
              setCategory(e.currentTarget.value);
              console.log(data);
            }}
          />
          <button
            onClick={() => {
              fetch(`/api/category/postCategory`, { method: 'POST', body: JSON.stringify({ category: category }) }).then((response) => {
                if (response.ok) {
                  // fetch("/api/comment/getComment")
                  // .then((r) => r.json())
                  // .then((result) => setData(result));
                  // 댓글 바로 보여주는 코드 필요
                }
              });
            }}
          >
            등록
          </button>
          {data.length > 0 ? (
            data.map((item: CategoryType, i: number) => {
              return (
                <div key={i}>
                  <span className='mr-4'>{item.value}</span>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
