import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import Comment from './Comment';

import dompurify from 'isomorphic-dompurify';
export interface PropType {
  params: {
    id: string;
    searchParams: {};
  };
}
export default async function Detail(props: PropType) {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
  let writer = await db.collection('userinfo').findOne({ username: result.writer });
  let content = result.content;
  const sanitizer = dompurify.sanitize;
  console.log(props);
  return (
    <div>
      <div className='pt-12 px-12 lg:px-80 justify-items-center md:px-40'>
        <div className='flex justify-between align-center'>
          <h1 className='pt-4 pb-4 font-bold leading-7 text-gray-900'>{result.title}</h1>
          <Link href={`../../edit/${result._id}`}>수정</Link>
        </div>
        <div className='border-b border-gray-900/10 pb-12'>
          <p className='mt-1 text-sm leading-6 text-gray-600 border-b border-gray-500 pb-6'>by  <span className='text-lg font-semibold text-black'>{result.writer }</span> </p>
          
          <div className=' grid grid-cols-1 gap-x-6 gap-y-4 '>
            <div className='mt-8 mb-32' dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
            <div className='pt-4 flex justify-start items-center'>
            <div className='flex items-center'>
              <img src={writer.image} className='mx-auto rounded-full shadow-lg dark:shadow-black/20 w-[75px] h-[75px]' alt='Avatar' />
              </div>
              <div>
                <div className='pl-8 text-2xl font-semibold'>{writer.username}</div>
                <div className='pl-8 mt-2 text-sm font-light'>{writer.about}</div>
                </div>
          </div>
          </div>
          
        </div>
        
        <Comment resultId={result._id.toString()} />
      </div>
    </div>
  );
}
