import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import ListPagenation from './ListPagenation';

export interface PostType {
  _id: string;
  title: string;
  content: string;
  writer: string;
  email: string;
  category: string;
  likeCount: number;
  likeMembers:string[]
  date: Date;
}


export default async function List() {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let session = await getServerSession(authOptions);
  let result = await db.collection('post').find().toArray();
  let post = result.reverse();
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>전체 글 목록</h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>다른 다람쥐들과 이야기를 나눠보세요</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          
        </div>

        {/* <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {post.map((item: PostType, i: number) => (
            <ListPreview {...item} key={i} />
          ))}
        </div> */}
        <ListPagenation post={post}></ListPagenation>
      </div>
    </div>
  );
}
