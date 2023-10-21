import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const db = (await connectDB).db("goodduck");
  let result = await db.collection("category").find().toArray();
  response.status(200).json(result);
}
