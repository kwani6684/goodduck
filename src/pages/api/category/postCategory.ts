import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function Handler(request: NextApiRequest, response: NextApiResponse) {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");

  request.body = JSON.parse(request.body);
  let result = await db.collection("category").find().toArray();

  if (request.method == "POST") {
    if (request.body.category == "") {
      return response.status(500).json("내용써라");
    }
    let res = result.find((category: any) => request.body.category === category.value);
    console.log(res)
    if (res!==null) {
      return response.status(500).json("중복임");
    }
    const data = {
      value: request.body.category,
    };
    await db.collection("category").insertOne(data);
    response.status(202).send("add category");
  }
}
