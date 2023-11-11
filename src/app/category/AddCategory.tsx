'use client';
import { useEffect, useState } from 'react';
import { CategoryType } from '../write/page';


export default function AddCategory() {
  let [category, setCategory] = useState('');
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/category/getCategory')
      .then((r) => r.json())
      .then((result) => setData(result));
  }, []);
  const refreshCategory = () => {
    fetch('/api/category/getCategory')
      .then((r) => r.json())
      .then((result) => setData(result));
  };
  return (
    <div>
      <h4 className='text-base pt-4 font-semibold leading-7 text-gray-900'>카테고리를 추가해주세염</h4>
      <p className='mt-1 text-sm leading-6 text-gray-600'>tip. 글쓰기 원하는 카테고리 + 이모지 형태로 추가해주세요 ex) 스포츠⚽️ </p>
      <input
        id='input'
        onChange={(e) => {
          setCategory(e.currentTarget.value);
          console.log(data);
        }}
      />
      <button
        className='border-2 border-yellow-800 text-yellow-800 text-sm uppercase tracking-widest py-2 px-4 mx-2 hover:bg-yellow-800 hover:text-white'
        onClick={() => {
          fetch(`/api/category/postCategory`, { method: 'POST', body: JSON.stringify({ category: category }) }).then((response) => {
            if (response.ok) {
              // fetch("/api/comment/getComment")
              // .then((r) => r.json())
              // .then((result) => setData(result));
              // 댓글 바로 보여주는 코드 필요
              refreshCategory();
            } else {
              alert('중복임');
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
  );
}
