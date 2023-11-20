import { connectDB } from './../util/database';
import Link from 'next/link';
import ListPreview from './lists/ListPreview';
import { PostType } from './lists/page';

export default async function Home() {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let result = await db.collection('post').find().toArray();
  let recentPost = result.reverse().slice(0, 3);
  console.log(recentPost)

  return (
    <div>
      <div className='relative w-full py-12 px-12 bg-yellow-900'>
        <div className='relative z-10 text-center py-4'>
          <h1 className='text-white text-center text-6xl font-display font-bold '>다람쥐굴🐿️</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 '>
        <div className='bg-gray-100 py-12 px-24 flex justify-start items-center'>
          <div className='max-w-md'>
            <div className='w-24 h-2 bg-yellow-800 mb-4'></div>
            <h2 className='font-display font-bold text-4xl leading-normal mb-6'>
              다람쥐굴에는
              <br />
              <span className='text-yellow-800'>다양한 종류</span>의
              <br /> 먹을거리가 있어요.
            </h2>
            <p className='font-light text-gray-600 mb-6 leading-relaxed'>
              세상에는 다양한 사람이 있는만큼 관심사도 많죠!! <br />
              다람쥐굴에서 관심사를 공유해보세요!!
            </p>
            <Link
              href='/category'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white'
            >
              카테고리 보러가기
            </Link>
          </div>
        </div>
        <div className='bg-gray-100 py-12 px-24 flex justify-start items-center'>
          <div className='max-w-md'>
            <div className='w-24 h-2 bg-yellow-800 mb-4 '></div>
            <h2 className='font-display font-bold text-4xl leading-normal  mb-6'>
              다람쥐굴에
              <br />
              <span className='text-yellow-800'>먹을거리</span>를
              <br /> 가져와 주세요.
            </h2>
            <p className='font-light text-gray-600 mb-6 leading-relaxed'>
              다람쥐굴은 여러분들의 노력으로 만들어져요. <br />
              먹을거리를 채워넣고, 카테고리를 추가해주세요!!
            </p>
            <Link
              href='/register'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white'
            >
              가입하기
            </Link>
          </div>
        </div>
      </div>
      <div className='flex pt-4 justify-center'>
        <div className='border-b-4 pt-4 border-yellow-900 text-center text-3xl inline-block  font-display font-bold '>최근 게시글</div>
      </div>
      <div className='mx-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 p-4 lg:mx-16 lg:max-w-none lg:grid-cols-3'>
        {recentPost.map((item: PostType, i: number) => (
          <ListPreview {...item} key={i} />
        ))}
      </div>
    </div>
  );
}
