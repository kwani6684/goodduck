import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export interface PostType {
  _id: string;
  title: string;
  content: string;
}

export default async function List() {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  let post = await db.collection("post").find().toArray();
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {post.map((item: PostType, i: number) => (
            <Link href={`../detail/${item._id}`}> 
            <article key={i} className="flex rounded-lg bg-emerald-100 shadow-lg px-4 pb-4 max-w-xl flex-col items-start justify-between">
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6  text-gray-900 group-hover:text-gray-600">{item.title}</h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6  text-gray-600">{item.content}</p>
              </div>
              </article>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
