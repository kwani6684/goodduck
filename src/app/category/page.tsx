import { getServerSession } from 'next-auth';
import { SessionType } from '../layout';
import AddCategory from './AddCategory';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function Category() {
  let session: SessionType | null = await getServerSession(authOptions);

  return (
    <div>
      {session?.user.role === 'admin' ? (
        <AddCategory />
      ) : (
        <div>
          <div>권한이 없어요 ㅜ</div>
          <div>내 게시글이 5개가 되면 카테고리를 추가 할 수 있어요</div>
        </div>
      )}
    </div>
  );
  //category 추가 세션 검사
}
