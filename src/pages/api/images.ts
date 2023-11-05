import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from "formidable";
import { PrismaClient } from "@prisma/client";
import { LocalFileStorage } from "@/backend/storage";

const prisma = new PrismaClient();
// const fileStorage = new LocalFileStorage("./public/uploads");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const images = await prisma.mcImage.findMany();
      res.status(200).json({ data: images });
      break;
    case "POST":
      const form = new Formidable({
        uploadDir: "./public/uploads",
        keepExtensions: true,
      });

      const [parsedField, parsedFile] = await form.parse(req);
      const imageFile = parsedFile.file && parsedFile.file[0];
      if (!imageFile) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const image = await prisma.mcImage.create({
        data: {
          url: "/uploads/" + imageFile.newFilename,
          metaData: "{}",
        },
      });
      // Respond back to the client
      res.status(200).json({
        message: "File uploaded and slider updated successfully",
        data: image,
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
