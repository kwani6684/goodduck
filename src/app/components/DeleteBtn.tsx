'use client';

interface DeleteBtnProps {
  deleteId: string;
}

let DeleteBtn = ({ deleteId }: DeleteBtnProps) => {
  return (
    <button
      onClick={() => {
        fetch('/api/deleteContent', { method: 'DELETE', body: deleteId }).then((response) => {
          if (response.ok) {
            alert('게시물이 삭제되었습니다.');
          } else {
            alert('권한이 없습니다.');
          }
        });
      }}
    >
      삭제
    </button>
  );
};
export default DeleteBtn;
