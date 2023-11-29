import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const db = (await connectDB).db("goodduck");
  let result = await db.collection("post").find().sort({date:-1}).limit(3).toArray();
  response.status(200).json(result);
}
