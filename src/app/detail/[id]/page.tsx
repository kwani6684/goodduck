import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";



export interface PropType{
  params: {
    id: string,
    searchParans:{}
  }
}
export default async function Detail(props:PropType) {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) });
    
  console.log(props);
  return (
    <div>
      <h4>Detail</h4>
      <h4>{result.title}</h4>
      <Link href={`../../edit/${result._id}`}>수정</Link>
      <p>{result.content}</p>
    </div>
  );
}
