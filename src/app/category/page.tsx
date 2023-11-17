import { getServerSession } from 'next-auth';
import { SessionType } from '../layout';
import AddCategory from './AddCategory';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import Link from 'next/link';
import { CategoryType } from '../write/page';
import Category from '../components/Category';


export default async function CategoryPage() {
  let session: SessionType | null = await getServerSession(authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let postCount = await db.collection('post').find({ email: session?.user.email }).toArray();
  let commentCount = await db.collection('comment').find({ email: session?.user.email }).toArray();
  let category: CategoryType[] = await db.collection('category').find().toArray();
  if (session?.user.role === 'normal') {
    if (commentCount.length>4 && postCount.length > 2) {
      await db.collection('userinfo').updateOne({ email: session?.user.email }, { $set: { role: 'squriell' } });
    }
  }
  

  return (
    <div className='py-12 px-12 lg:px-60 md:px-30'>
      <div className='border-b border-gray-900/10 pb-12'>
        {session?.user.role === 'admin' || session?.user.role === 'squriell' ? (
          <AddCategory />
        ) : (
          <div>
              <div>❗️내 게시글이 3개가 넘고 댓글을 5개 이상 달았다면 로그아웃 후 재 로그인 하면 카테고리를 추가 할 수 있어요🐿️</div>
              <div>현재 게시글 수 : {postCount.length} , 현재 댓글 수 :{ commentCount.length}</div>
              <div className='flex justify-center pt-4'>
            
                <Link
              href='/write'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-4 mx-2 hover:bg-yellow-800 hover:text-white'
            >
              게시글 쓰러가기
                </Link>
                <Link
              href='/lists'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-4 mx-2 hover:bg-yellow-800 hover:text-white'
            >
              댓글 달러가기
                </Link>
                </div>
          </div>
        )}
        <Category category ={category}/>
      </div>
    </div>
  );
  //category 추가 세션 검사
}
