import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Result } from 'postcss';
import { authOptions } from './auth/[...nextauth]';

export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
    let session=await getServerSession(request,response,authOptions)
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    const now: Date = new Date();
    if (request.method === 'POST') {
        if (request.body.title == '') {
            return response.status(500).json('제목써라')
        }
        try {
            let data = {
                title: request.body.title,
                content: request.body.content,
                writer: session?.user?.name,
                email:session?.user?.email,
                date:now
            }
            let result=await db.collection('post').updateOne({ _id: new ObjectId(request.body._id) }, { $set: data })
            console.log(result)

            response.redirect(302, '/lists')
        }
        catch(error) {
            response.redirect(302,'/errorpage')
        }
    }
}
