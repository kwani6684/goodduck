import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

import { PropType } from "@/app/detail/[id]/page";

export default async function Edit(props: PropType) {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <form action="/api/editContent" method="POST">
        <div className="py-12 px-12 lg:px-80 md:px-30">
          <div className="border-b border-gray-900/10 pb-12">
            <h4 className="text-base pt-4 font-semibold leading-7 text-gray-900">Edit Article</h4>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="postTitle" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="title"
                      defaultValue={result.title}
                    />
                  </div>
                </div>
              </div>
                <input type="text" name="_id" id="_id" defaultValue={result._id.toString()} className="hidden"/>
              <div className="col-span-full">
                <label htmlFor="postContent" className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={result.content}
                    placeholder="content"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10 flex items-center justify-center gap-x-6">
          <button type="button" className="text-lg font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
