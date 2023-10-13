import { NextApiRequest, NextApiResponse } from 'next';

export default function showDate(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const now: Date = new Date();
        response.status(200).json({ currentTime: now });
    }
}
