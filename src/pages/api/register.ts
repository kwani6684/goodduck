import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = (await connectDB) as any;
  const db = client.db("goodduck");
  const info = await db.collection("userinfo").find().toArray();

  const req = request.body;
    if (request.method === "POST") {
    if (info.length > 0) {
      for (let i = 0; i < info.length; i++) {
        if (req.email == info[i].email) {
          console.log(info[i].email);
          return response.status(500).json("email 중복");
        }
      }
    }
    if (req.password != req.passwordCheck) {
      return response.status(500).json("비번다름");
    }
    const hash = await bcrypt.hash(req.password, 10);
    const hashCheck = await bcrypt.hash(req.passwordCheck, 10);
    req.password = hash;
    req.passwordCheck = hashCheck;
    try {
      const data = {
          ...req,
          role:'normal'
      };
      console.log(data);

      await db.collection("userinfo").insertOne(data);

      response.redirect(302, "/lists");
    } catch (error) {
      response.redirect(302, "/errorpage");
    }
  }
}
