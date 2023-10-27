'use client';

import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

interface CommentType {
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
  return (
    <div>
      <div>댓글</div>

      <input
        onChange={(e) => {
          setComment(e.currentTarget.value);
          console.log(data);
        }}
      />
      <button
        onClick={() => {
          fetch(`/api/comment/postComment`, { method: 'POST', body: JSON.stringify({ comment: comment, parent: resultId }) }).then((response) => {
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
        data.map((item, i): any => {
          return (
            <div key={i}>
              <span className='mr-4'>{item.writer}</span>
              <span>{item.comment}</span>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
