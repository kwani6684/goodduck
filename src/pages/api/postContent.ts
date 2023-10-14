import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    if (request.method === 'POST') {
        if (request.body.title == '') {
            return response.status(500).json('제목써라')
        }
        try {
            const data = {
                title: request.body.title,
                content: request.body.content
            }
            await db.collection('post').insertOne(data)

            response.redirect(302, '/lists')
        }
        catch(error) {
            response.redirect(302,'/errorpage')
        }
    }
}
