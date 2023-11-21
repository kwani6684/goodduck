import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  let userinfo =await db.collection('userinfo').findOne({ email: session?.user?.email});
  const req = request.body;
  let imageUrl = `https://goodduckbucket.s3.ap-northeast-2.amazonaws.com/${encodeURIComponent(req.profileImage)}`;
  if (req.profileImage === '') {
    imageUrl = userinfo.image;
  }
  if (request.method === 'POST') {
    try {
      let data = {
        username: req.username,
        about: req.about,
        image: imageUrl,
      };
      let result = await db.collection('userinfo').updateOne({  email: session?.user?.email }, { $set: data });
      console.log(result);

      response.redirect(302, '/lists');
    } catch (error) {
      response.redirect(302, '/errorpage');
    }
  }
}
