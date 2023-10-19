import { MongoClient } from "mongodb";
import Image from "next/image";
import { connectDB } from "./../util/database";
import { useSession } from "next-auth/react";

export default async function Home() {
  
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  let result = await db.collection("post").find().toArray(); //post collection의 모든데이터를 어레이에 담아줌
  console.log(result);
  return <div>안녕</div>;
}
