import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import Editor from '@/app/write/QuillEdit';
import { PropType } from '@/app/detail/[id]/page';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { SessionType } from '@/app/layout';
import { CategoryType } from '@/app/write/page';

export default async function Edit(props: PropType) {
  let session: SessionType | null = await getServerSession(authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
  let category: CategoryType[] = await db.collection('category').find().toArray();

  return (
    <div>
      {session?.user.email == result.email || session?.user.role == 'admin' ? (
        <div className='pt-12 px-12 lg:px-80 md:px-30'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h4 className='text-base pt-4 font-semibold leading-7 text-gray-900'>QuillEditor Article</h4>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              ❗️이미지를 업로드 할 때 꼭 에디터의 <span className='text-rose-700 font-semibold'>이미지버튼</span> 을 클릭해서 업로드 해주세요🙏
              (기능개발중🛠️)
            </p>

            <Editor
              category={category}
              defaultValue={result.content}
              defaultTitle={result.title}
              defaultCategory={result.category}
              resultId={result._id}
            ></Editor>
          </div>
        </div>
      ) : (
        <div>권한 x</div>
      )}
    </div>
  );
}
