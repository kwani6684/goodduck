import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


interface PropType{
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
      <p>{result.content}</p>
    </div>
  );
}
