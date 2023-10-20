import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
    const db = (await connectDB).db('goodduck')
    const id = request.query.id as string;
    console.log(id);
    let result = await db.collection('comment').find({ parent : new ObjectId(id) }).toArray()
    response.status(200).json(result)
  }
