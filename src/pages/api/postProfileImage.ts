import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: 'goodduckbucket',
    Fields: { key: request.query.file },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], //파일용량 1MB 까지 제한
      ],
      
  });

  response.status(200).json(url);
}
