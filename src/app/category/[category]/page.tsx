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
  let result = await db
    .collection('post')
    .find({ category: decodeURIComponent(props.params.category) })
    .toArray();
  console.log(result);
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>From the blog</h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>Learn how to grow your business with our expert advice.</p>
        </div>
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {result.map((item: PostType, i: number) => (
            <ListPreview {...item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
