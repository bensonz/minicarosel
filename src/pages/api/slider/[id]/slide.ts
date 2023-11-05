import prismaClient from "@/backend/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const mySlides = await prismaClient.mcSliderItem.findMany({
        where: {
          mcSliderId: parseInt(req.query.id as string, 10),
        },
        select: {
          id: true,
          title: true,
          description: true,
          buttonText: true,
          component: true,
          mcImageId: true,
          bgImage: true,
        },
      });
      res.status(200).json({ data: mySlides });
      break;
    case "POST":
    case "PUT":
      const { title, description, buttonText, component, mcImageId } = req.body;
      const id = parseInt(req.body.id, 10);
      const item = await prismaClient.mcSliderItem.upsert({
        where: { id: id || -1 }, // When creating, use a dummy ID that doesn't exist. `upsert` will then default to create operation.
        create: {
          title,
          description,
          buttonText,
          component,
          mcImageId: parseInt(mcImageId, 10),
        },
        update: {
          title,
          description,
          buttonText,
          component,
          mcImageId: parseInt(mcImageId, 10),
        },
      });
      res.status(200).json({ data: item });
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
