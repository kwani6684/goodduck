import Link from 'next/link';
import { PostType } from './page';
import ImageFromHtml from './ImageFromHTML';

export default function ListPreview(props: PostType) {
  return (
    <Link href={`../detail/${props._id}`}>
      <div className='rounded-2xl bg-white m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0'>
        <ImageFromHtml content={props.content} />

        <div className='p-6'>
          <div className='flex mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
            <span className='flex-start flex-1'>{props.title}</span>
            <span className='flex-end flex-1 text-right'>{props.category}</span>
          </div>
          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
            This is a wider card with supporting text below as a natural lead-in to additional content.
          </p>
          <p className='mb-2 text-base text-neutral-600 dark:text-neutral-200'>
            <p>{props.writer}</p>
            <small>{props.date.toLocaleString()}</small>
          </p>
        </div>
      </div>
    </Link>
  );
}
