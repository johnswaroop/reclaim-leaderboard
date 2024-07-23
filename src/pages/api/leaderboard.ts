import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../connectToDatabase";
import User from "../../modal/user";
import Proof from "../../modal/proof";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        const rankedUsers = await Proof.aggregate([
          {
            $group: {
              _id: "$email",
              totalXp: { $sum: "$xp" },
            },
          },
          {
            $sort: { totalXp: -1 },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "email",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              _id: 0,
              email: "$_id",
              totalXp: 1,
              name: "$user.name",
              picture: "$user.picture",
            },
          },
        ]);

        res.status(200).json({ success: true, data: rankedUsers });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: (error as Error).message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
