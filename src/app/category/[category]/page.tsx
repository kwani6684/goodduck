import ListItem from '@/app/lists/ListItem';
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
    <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
      {result.map((item: PostType, i: number) => (
        <ListItem {...item} key={i} />
      ))}
    </div>
  );
}
