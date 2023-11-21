import { PropType } from '@/app/detail/[id]/page';
import { SessionType } from '@/app/layout';
import ListPreview from '@/app/lists/ListPreview';
import { PostType } from '@/app/lists/page';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

let MyPage = async (props: PropType) => {
  let session: SessionType | null = await getServerSession(authOptions);

  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let user = await db.collection('userinfo').findOne({ email: { $regex: `^${decodeURIComponent(props.params.id)}` } });
  let result = await db
    .collection('post')
    .find({ email: { $regex: `^${decodeURIComponent(props.params.id)}` } })
    .toArray();
  const post = result.reverse();
  return (
    <div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='p-4 flex justify-start items-center'>
            <div className='flex items-center'>
              <img src={user.image} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[150px] h-[150px]' alt='Avatar' />
            </div>
            <div>
              <div className='pl-8 text-4xl font-semibold'>{user.username}</div>
              <div className='flex space-between'>
                <div className='pl-8 mt-2 text-lg font-light'>{user.about}</div>
                {session?.user.email?.substring(0,session?.user.email?.indexOf('@'))=== decodeURIComponent(props.params.id) ? (
                  <Link href={`./${decodeURIComponent(props.params.id)}/edit`} className='mt-2 text-lg sm:pl-8  '>
                    수정
                  </Link>
                 ) : (
                  ''
                )} 
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div className='text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl'>내 글</div>
            <div className='ml-4 rounded-full p-2 border border-yellow-800 text-yellow-800'>{post.length}</div>
          </div>

          <div className='mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200  sm:mt-4 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {post.map((item: PostType, i: number) => (
              <ListPreview {...item} key={i} />
            ))}
          </div>
        </div>
      </div>
      <div className='pt-12 px-12 lg:px-80 justify-items-center md:px-40'></div>
    </div>
  );
};
export default MyPage;
