'use client';

import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

interface CommentType {
  url: string;
  comment: String;
  writer: String;
  email: String;
  parent: string;
  date: string;
}
export default function Comment({ resultId }: any) {
  let [comment, setComment] = useState('');
  let [data, setData] = useState<CommentType[]>([]);
  useEffect(() => {
    fetch(`/api/comment/getComment?id=${resultId}`)
      .then((r) => r.json())
      .then((result) => setData(result));
  }, []);

  const updateCommentList = () => {
    // 댓글 목록을 업데이트하는 함수
    fetch(`/api/comment/getComment?id=${resultId}`)
      .then((r) => r.json())
      .then((result) => setData(result));
  };
  return (
    <div>
      <div>댓글</div>

      <input
        onChange={(e) => {
          setComment(e.currentTarget.value);
        }}
        value={comment}
      />
      <button
        type='submit'
        onClick={() => {
          fetch(`/api/comment/postComment`, { method: 'POST', body: JSON.stringify({ comment: comment, parent: resultId }) }).then((response) => {
            if (response.ok) {
              // fetch("/api/comment/getComment")
              // .then((r) => r.json())
              // .then((result) => setData(result));
              // 댓글 바로 보여주는 코드 필요
              updateCommentList();
              setComment('');
            }
          });
        }}
      >
        등록
      </button>
      {data.length > 0 ? (
        data.map((item, i): any => {
          return (
            <div className='flex items-center py-6' key={i}>
              <div className='flex items-center'>
                <img src={item.url} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[50px] h-[50px]' alt='Avatar' />
              </div>
              <span className='pl-4'>{item.writer}</span>
              <span className='pl-4'>{item.comment}</span>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
