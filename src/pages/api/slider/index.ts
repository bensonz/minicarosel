import prismaClient from "@/backend/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const sliders = await prismaClient.mcSlider.findMany({
        select: {
          id: true,
          slides: {
            select: {
              id: true,
              title: true,
              description: true,
              buttonText: true,
              bgImage: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json({ data: sliders });
      break;
    case "POST":
      // no accept anything, just new an empty one
      const newSlider = await prismaClient.mcSlider.create({
        data: {},
      });
      res.status(200).json({ data: newSlider });
      break;
    case "DELETE":
      const { id } = JSON.parse(req.body);
      await prismaClient.mcSlider.delete({
        where: { id: parseInt(id as string, 10) },
      });
      res.status(200).json({ data: {} });
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
