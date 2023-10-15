import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Result } from 'postcss';

export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    if (request.method === 'POST') {
        if (request.body.title == '') {
            return response.status(500).json('제목써라')
        }
        try {
            let data = {
                title: request.body.title,
                content: request.body.content
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
