import prismaClient from "@/backend/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const mySlides = prismaClient.mcSliderItem.findMany({
        where: {
          mcSliderId: parseInt(req.query.id as string, 10),
        },
        select: {
          id: true,
          bgImage: true,
        },
      });
      res.status(200).json({ data: mySlides });
      break;
    case "POST":
      // prismaClient.mcSliderItem.create({});
      res.status(200).json({ data: {} });
      break;
    case "PUT":
      // Handle PUT request
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
