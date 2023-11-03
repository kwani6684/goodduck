import { getServerSession } from 'next-auth';
import { SessionType } from '../layout';
import AddCategory from './AddCategory';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';

export default async function Category() {
  let session: SessionType | null = await getServerSession(authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let postCount = await db.collection('post').find({ email: session?.user.email }).toArray();
  console.log(postCount.length);
  if (session?.user.role === 'normal' && postCount.length > 2) {
    await db.collection('userinfo').updateOne({ email: session?.user.email }, { $set: { role: 'squriell' } });
  }

  return (
    <div>
      {session?.user.role === 'admin' || session?.user.role === 'squriell' ? (
        <AddCategory />
      ) : (
        <div>
          <div>권한이 없어요 ㅜ</div>
            <div>내 게시글이 5개가 되면 카테고리를 추가 할 수 있어요</div>
            <div>❗️내 게시글이 5개가 넘었다면 로그아웃 후 재 로그인 하면 카테고리를 추가 할 수 있어요🐿️</div>
        </div>
      )}
    </div>
  );
  //category 추가 세션 검사
}
