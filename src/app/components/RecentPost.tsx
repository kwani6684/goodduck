import ListPreview from "../lists/ListPreview";
import { PostType } from "../lists/page";

export default function RecentPost({ result }:{result: PostType[]}){
    return (
        <div className='mx-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 p-4 lg:mx-16 lg:max-w-none lg:grid-cols-3'>
        {result.map((item: PostType, i: number) => (
          <ListPreview {...item} key={i} />
        ))}
      </div>
    )
}