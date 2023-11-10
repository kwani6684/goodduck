import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { authOptions } from '../auth/[...nextauth]';

export default async function postLike(request: NextApiRequest, response: NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);
  const client = (await connectDB) as any;

  const db = client.db('goodduck');
  request.body = JSON.parse(request.body);

  let query = { _id: new ObjectId(request.body.id) };

  if (request.method == 'POST') {
    try {
      const result = await db.collection('post').findOne(query);
      let likeMember = result.likeMembers; // 변경: likeMembers 사용
      if (session) {
        if (likeMember.includes(session?.user?.email)) {
          const data = {
            likeCount: result.likeCount - 1, // likeCount를 1 증가
            likeMembers: likeMember.filter((element: string) => {
              element !== session?.user?.email;
            }), // likeMembers에 새로운 이메일 추가
          };
          console.log(data);

          let res = await db.collection('post').updateOne({ _id: new ObjectId(request.body.id) }, { $set: data });
        } else {
          const data = {
            likeCount: result.likeCount + 1, // likeCount를 1 증가
            likeMembers: [...likeMember, session?.user?.email], // likeMembers에 새로운 이메일 추가
          };
          console.log(data);
          let res = await db.collection('post').updateOne({ _id: new ObjectId(request.body.id) }, { $set: data });
        }
      }
      // response.redirect(302, '/lists');
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
