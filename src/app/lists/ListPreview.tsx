import Link from 'next/link';
import { PostType } from './page';
import ImageFromHtml from './ImageFromHTML';
import dompurify from 'isomorphic-dompurify';

export default function ListPreview(props: PostType) {
  const sanitizer = dompurify.sanitize;
  function replaceTagsWithBr(text:string) {
    // 정규식을 사용하여 문자열 사이의 태그를 모두 제거
    const textWithoutTags = text.replace(/<[^>]+>/g, '');
  
    // 문자열을 줄 바꿈 태그로 나누고, 각 부분을 <br/>으로 연결
    const lines = textWithoutTags.split(/[\n\r]+/);
      const textWithBr = lines.join('<br/>');
      const displayText = lines.slice(0, 10).join();
      const line = displayText.substr(0,30)+' <span style="color:gray"> ...<span><p style="color:gray">더보기<p>'
      console.log(line)

  
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

          <div className='mb-4 text-base text-neutral-600 dark:text-neutral-200' dangerouslySetInnerHTML={{ __html: sanitizer(replaceTagsWithBr(props.content)) }}></div>
          <div className='mb-2 text-base text-neutral-200'>
            <div><span className="text-neutral-400">by </span>{props.writer}</div>
            <small>{props.date.toLocaleString()}</small>
          </div>
        </div>
      </div>
    </Link>
  );
}
