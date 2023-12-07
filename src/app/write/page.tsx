import { connectDB } from '@/util/database';
import Editor from './QuillEdit';
import { SessionType } from '../layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Link from 'next/link';
// import dynamic from 'next/dynamic';
export interface CategoryType {
  _id: string;
  value: string;
}
// var editor = new Quill('.editor'); // First matching element will be used
// var delta = editor.getContents();

export default async function QuillEditor() {
  let session: SessionType | null = await getServerSession(authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let category: CategoryType[] = await db.collection('category').find().toArray();
  // console.log(delta)
  return (
    <div className='py-12 px-12 lg:px-80 md:px-30'>
      {session === null ? (
        <div>
          <div>회원가입을 하면 다람쥐굴에 먹을거리를 가져올 수 있어요🐿️</div>
          <div className='flex justify-center pt-4'>
            <Link
              href='/register'
              className='inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-4 mx-2 hover:bg-yellow-800 hover:text-white'
            >
            회원가입 하기
            </Link>
          </div>
        </div>
      ) : (
        <div className='border-b border-gray-900/10 pb-12'>
          <h4 className='text-base pt-4 font-semibold leading-7 text-gray-900'>Write Article</h4>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            ❗️이미지를 업로드 할 때 꼭 에디터의 <span className='text-rose-700 font-semibold'>이미지버튼</span> 을 클릭해서 업로드 해주세요🙏
            (기능개발중🛠️)
          </p>

          <Editor category={category} defaultTitle={''} defaultCategory={category[0].value} defaultValue={''}></Editor>
        </div>
      )}
    </div>
  );
}
