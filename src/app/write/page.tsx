import { connectDB } from '@/util/database';
import Editor from './QuillEdit';
import { SessionType } from '../layout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
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
    <div>
      {session === null ? (
        <div>권한 x</div>
      ) : (
        <div className='pt-12 px-12 lg:px-80 md:px-30'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h4 className='text-base pt-4 font-semibold leading-7 text-gray-900'>QuillEditor Article</h4>
            <p className='mt-1 text-sm leading-6 text-gray-600'>Use a permanent address where you can receive mail.</p>

            <Editor category={category}></Editor>
          </div>
        </div>
      )}
    </div>
  );
}
