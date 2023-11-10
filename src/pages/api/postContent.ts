import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);
  const client = (await connectDB) as any;
  const db = client.db('goodduck');
  const now: Date = new Date();
  request.body = JSON.parse(request.body);
  if (request.method === 'POST') {
    if (request.body.title == '') {
      return response.status(500).json('제목써라');
    }
    try {
      const data = {
        title: request.body.title,
        content: request.body.content,
        writer: session?.user?.name,
        email: session?.user?.email,
        category: request.body.category,
        likeCount: 0,
        likeMembers:[],
        date: now,
      };
      await db.collection('post').insertOne(data);

      response.redirect(302, '/lists');
    } catch (error) {
      response.redirect(302, '/errorpage');
    }
  }
}
