import Link from 'next/link';
import { PostType } from './page';
import ImageFromHtml from './ImageFromHTML';
import dompurify from 'isomorphic-dompurify';

export default function ListPreview(props: PostType) {
  const sanitizer = dompurify.sanitize;
  function replaceTagsWithBr(text: string) {
    // 정규식을 사용하여 문자열 사이의 태그를 모두 제거
    const textWithoutTags = text.replace(/<[^>]+>/g, '');

    // 문자열을 줄 바꿈 태그로 나누고, 각 부분을 <br/>으로 연결
    const lines = textWithoutTags.split(/[\n\r]+/);
    const displayText = lines.slice(0, 10).join();
    const line = displayText.substr(0, 30) + ' <span style="color:gray"> ...<span><p style="color:gray">더보기<p>';
    console.log(line);

    return line;
  }
  return (
    <Link href={`../detail/${props._id}`}>
      <div className='rounded-2xl bg-white m-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0'>
        <ImageFromHtml content={props.content} />

        <div className='p-6'>
          <div className='flex mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
            <span className='flex-start flex-1 mr-4'>{props.title}</span>
            <span className='flex-end flex  text-right'>{props.category}</span>
          </div>

          <div
            className='mb-4 text-base text-neutral-600 dark:text-neutral-200'
            dangerouslySetInnerHTML={{ __html: sanitizer(replaceTagsWithBr(props.content)) }}
          ></div>
          <div className='mb-2 text-base text-neutral-200'>
            <div>
              <span className='text-neutral-400'>by </span>
              {props.writer}
            </div>
            <div className='flex justify-between'>
              <small>{props.date.toLocaleString()}</small>
              <div className='flex items-center'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 text-yellow-800'>
                  <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
                </svg>
                <div className=' text-lg'>{props.likeCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
