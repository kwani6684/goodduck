'use client';

import { useEffect, useState } from 'react';

interface CommentType {
  url: string;
  comment: String;
  writer: String;
  email: String;
  parent: string;
  date: string;
}
function getRelativeTime(date:any) {
  const now = new Date() as any;
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  console.log(diff)

  if (minutes < 1) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    return `${hours}시간 전`;
  } else {
    return date.toLocaleString(); // 더 오래된 경우 날짜를 표시
  }
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
            <div key={i}>
              <div className='flex items-center pt-4' >
                <div className='flex items-center'>
                  <img src={item.url} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[50px] h-[50px]' alt='Avatar' />
                </div>
                <span className='pl-4 font-semibold'>{item.writer}</span>
                <span className='pl-4'>{item.comment}</span>
              </div>
              <small className='inline-block pl-16 pb-2'>{getRelativeTime(new Date(item.date))}</small>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
