import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import squriell from '../../../public/sqirell.jpg';
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  const info = await db.collection('userinfo').find().toArray();

  const req = request.body;

  let imageUrl = `https://goodduckbucket.s3.ap-northeast-2.amazonaws.com/${encodeURIComponent(req.profileImage)}`;
  if (req.profileImage === '') {
    imageUrl = `https://goodduckbucket.s3.ap-northeast-2.amazonaws.com/default/sqirell.jpg`;
  }
  if (request.method === 'POST') {
    if (req.email != '' && req.password != '' && req.name != '') {
      if (info.length > 0) {
        for (let i = 0; i < info.length; i++) {
          if (req.email == info[i].email) {
            console.log(info[i].email);
            return response.status(500).json('email 중복');
          }
        }
      }
      if (req.password != req.passwordCheck) {
        return response.status(500).json('비번다름');
      }
      const hash = await bcrypt.hash(req.password, 10);
      const hashCheck = await bcrypt.hash(req.passwordCheck, 10);
      req.password = hash;
      req.passwordCheck = hashCheck;
      try {
        const data = {
          ...req,
          role: 'normal',
          image: imageUrl,
        };
        console.log(request.body);

        await db.collection('userinfo').insertOne(data);

        response.redirect(302, '/lists');
      } catch (error) {
        response.redirect(302, '/errorpage');
      }
    } else {
      return response.status(500).json('정보를 입력해');
    }
  }
}
