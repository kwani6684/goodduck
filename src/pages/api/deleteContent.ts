import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
export interface SessionType {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export default async function deleteContent(request: NextApiRequest, response: NextApiResponse) {
  let session: SessionType | null = await getServerSession(request, response, authOptions);
  const client = (await connectDB) as any;
  const db = client.db("goodduck");

  if ((request.method = "DELETE")) {
    let id = request.body;
    let query = { _id: new ObjectId(id) };
    const result = await db.collection("post").findOne(query);
    if (session?.user.email == result.email || session?.user.role == "admin") {
      await db.collection("post").deleteOne(query);
      response.status(202).send(`Successfully removed game with id ${id}`);
    } else {
      return response.status(500).json("권한이 없습니다.");
    }
  }
}
