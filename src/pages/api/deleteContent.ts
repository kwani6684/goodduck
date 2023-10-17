import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteContent(request: NextApiRequest, response: NextApiResponse) {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  if ((request.method = "DELETE")) {
    let id = request.body;
    let query = { _id: new ObjectId(id) };
    try {
      const result = await db.collection("post").deleteOne(query);
      if (result && result.deletedCount) {
        response.status(202).send(`Successfully removed game with id ${id}`);
      } else if (!result) {
        response.status(400).send(`Failed to remove game with id ${id}`);
      } else if (!result.deletedCount) {
        response.status(404).send(`Game with id ${id} does not exist`);
      }
    } catch (error) {
      response.status(400).send("fail");
    }
  }
}
