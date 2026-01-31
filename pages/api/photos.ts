import type { NextApiRequest, NextApiResponse } from "next";
import { client} from "../../lib/r2";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const listCommand = new ListObjectsV2Command({ Bucket: "chladni-plate-photos" });
    const listResult = await client.send(listCommand);

    const keys = listResult.Contents?.map(obj => obj.Key) || [];

    const urls = await Promise.all(
      keys.map(async (key) => {
        const getCommand = new GetObjectCommand({ Bucket: "chladni-plate-photos", Key: key });
        return await getSignedUrl(client, getCommand, { expiresIn: 3600 });
      })
    );

    res.status(200).json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Abrufen der Bilder" });
  }
}