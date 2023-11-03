import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import { PrismaClient } from "@prisma/client";
import { LocalFileStorage } from "../../../backend/storage";

const prisma = new PrismaClient();
const fileStorage = new LocalFileStorage("./public/uploads");
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      const form = new formidable.IncomingForm({
        uploadDir: "./public/uploads",
        keepExtensions: true,
      });
      form.parse(req, async (err, fields: any, files: { image?: any }) => {
        if (err) {
          res.status(500).json({ message: "Error processing form data" });
          return;
        }

        const imageFile = files.image;
        const sliderId = fields.sliderId as string;
        let fpath;
        try {
          fpath = await fileStorage.save(imageFile);
        } catch (err) {
          res.status(500).json({ message: "Error saving the file" });
          return;
        }
        const image = await prisma.mcImage.create({
          data: {
            url: fpath,
            metaData: "{}",
          },
        });

        await prisma.mcSlide.update({
          where: { id: parseInt(sliderId, 10) },
          data: { mcImageId: image.id },
        });

        // Respond back to the client
        res.status(200).json({
          message: "File uploaded and slider updated successfully",
        });
      });

      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
