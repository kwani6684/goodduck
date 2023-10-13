import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function (request: NextApiRequest, response: NextApiResponse) {
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    let post = await db.collection("post").find().toArray();

    if (request.method == 'GET') {
        
        response.status(200).json(post)
    }
    else if ( request.method == 'POST' ) {
        
    }
    
}