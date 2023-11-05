import prismaClient from "@/backend/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const sliderId = req.query.id as string;
  switch (method) {
    case "GET":
      const slider = prismaClient.mcSlider.findFirst({
        where: {
          id: parseInt(sliderId, 10),
        },
      });
      if (!slider) {
        res.status(404).json({ message: `Slider ${sliderId} not found` });
        return;
      }
      const slides = prismaClient.mcSlide.findMany({
        where: {
          mcSliderId: parseInt(sliderId, 10),
        },
        select: {
          id: true,
          bgImage: true,
        },
      });

      break;
    case "POST":
      // Handle POST request
      break;
    case "PUT":
      // Handle PUT request
      break;
    case "DELETE":
      // Handle DELETE request
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
