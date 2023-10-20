import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from './../auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { ObjectId } from "mongodb";

export default async function Handler(request:NextApiRequest,response:NextApiResponse) {
    let session = await getServerSession(request,response,authOptions)
    const client = (await connectDB) as any;
    const db = client.db("goodduck");
    const now: Date = new Date();
    request.body = JSON.parse(request.body);
    
    if (request.method == "POST") {
        if (request.body.comment == '') {
            return response.status(500).json('내용써라')
        }
        const data = {
            comment: request.body.comment,
            writer: session?.user?.name,
            email: session?.user?.email,
            parent:new ObjectId(request.body.parent),
            date: now,
            
        }
        await db.collection('comment').insertOne(data)
        response.status(202).send('add comment');
    }
    if (request.method == "GET") {
        
        let query = { parent: new ObjectId(request.body.parent) };
        let res = await db.collection('comment').find(query).toArray();
        console.log(res)
        response.status(200).json(res)
    }
}