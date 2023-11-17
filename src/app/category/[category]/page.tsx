import ListPreview from '@/app/lists/ListPreview';
import { PostType } from '@/app/lists/page';
import { connectDB } from '@/util/database';

interface PropType {
  params: { category: string };
  searchParams: {};
}

export default async function CategoryList(props: PropType) {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  const thisCategory= decodeURIComponent(props.params.category);
  let result = await db
    .collection('post')
    .find({ category: thisCategory })
    .toArray();
  const post = result.reverse()
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{thisCategory}</h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>{thisCategory}에 대한 이야기를 나누는 다람쥐굴이에요.</p>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {post.map((item: PostType, i: number) => (
            <ListPreview {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
