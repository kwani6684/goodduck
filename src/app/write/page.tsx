import { connectDB } from "@/util/database";

export interface CategoryType{
  _id: string,
  key: string,
  value:string
}

export default async function Write() {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  let category = await db.collection("category").find().toArray();
  
  return (
    <div>
      <form action="api/postContent" method="post">
        <div className="py-12 px-12 lg:px-80 md:px-30">
          <div className="border-b border-gray-900/10 pb-12">
            <h4 className="text-base pt-4 font-semibold leading-7 text-gray-900">Write Article</h4>
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
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-1.5">
                <label htmlFor="postTitle" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    
                    <select
                      name="category"
                      id="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    >
                      {category.map((item:CategoryType, i:number) => {
                        return (
                          <option key={i} value={item.key}>{item.value}</option>
                        )
                      })}
                     
                    </select>
                  </div>
                </div>
              </div>

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
                    defaultValue={""}
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
