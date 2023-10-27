import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import Comment from './Comment';

export interface PropType {
  params: {
    id: string;
    searchParans: {};
  };
}
export default async function Detail(props: PropType) {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
  let content = result.content;

  console.log(props);
  return (
    <div>
      <div className='pt-12 px-12 lg:px-80 justify-items-center md:px-40'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h1 className='pt-4 pb-4 font-bold leading-7 text-gray-900'>{result.title }</h1>
          <p className='mt-1 text-sm leading-6 text-gray-600 border-b border-gray-500 pb-6'>Use a permanent address where you can receive mail.</p>
          
          <div className=' grid grid-cols-1 gap-x-6 gap-y-4 '>
          <div className='mt-8' dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
        <Link href={`../../edit/${result._id}`}>수정</Link>
      <Comment resultId={result._id.toString()} />
      </div>
     
      
    </div>
  );
}
