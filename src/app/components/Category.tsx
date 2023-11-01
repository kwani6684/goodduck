import Image from 'next/image';
import acorn from '../../../public/acorn.png';
import { CategoryType } from '../write/page';
import Link from 'next/link';

interface CategoryProps {
  category: CategoryType[]; // category prop의 타입을 정의
}

export default function Category({ category }: CategoryProps) {
  return (
    <div className='m-10 flex justify-center'>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-20'>
        {category.map((item, i) => {
          return (
            <Link
              href={`../category/${encodeURIComponent(item.value)}`}
              key={i}
              className='relative inline-block w-[150px] h-[150px] border-0 border-yellow-500 p-2 rounded-3xl  hover:shadow-2xl hover:border-4 hover:transition:1 sm:w-[200px] sm:h-[200px]'
            >
              <Image src={acorn} alt='acorn' className='object-cover'></Image>
              <div className='absolute left-0 right-8 top-0 bottom-0 flex items-center justify-center'>
                <div className='text-md font-bold border-0 rounded-xl bg-neutral-200/50 p-2 sm:text-xl '>{item.value}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
