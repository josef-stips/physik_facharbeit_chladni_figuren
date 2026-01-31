import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  region: "auto", 
  endpoint: "https://5f1cebc7d248a89480ded2959e8beabc.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});