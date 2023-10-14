import { connectDB } from '@/util/database';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function showDate(request: NextApiRequest, response: NextApiResponse) {
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    const info = db.collection('userinfo').find().toArray();

    const req = request.body
    if (request.method === 'POST') {

        if (info.length>0) {
            for (let i = 0; i < info.length; i++) {
                if (request.body.userID == info[i].userID) {
                    return response.status(500).json('아이디 ㅈ복')
                }
            }
        }
        try {
            const data = {
                // name: req.name,
                // email: req.email,
                // userID: req.userID,
                // password: req.password,
                // username: req.username,
                // about:req.about
                ...req

            }
            await db.collection('userinfo').insertOne(data)
           
            response.redirect(302, '/lists')
        }
        catch (error) {
            
            response.redirect(302,'/errorpage')
        }
    }
}
