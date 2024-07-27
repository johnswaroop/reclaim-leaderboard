import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../connectToDatabase";
import Proof from "../../../modal/proof";
import User from "../../../modal/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { value } = req.query;

  await connectToDatabase();

  switch (method) {
    case "GET":
      try {
        if (!value || typeof value !== "string") {
          return res.status(400).json({
            success: false,
            message: "Value is required and must be a string",
          });
        }

        // Find proofs by the provided value
        const proofs = await Proof.find({ value: value.toLowerCase().trim() });

        if (proofs.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No proofs found for the given value",
          });
        }

        // Aggregate total XP by email
        const rankedUsers = await Proof.aggregate([
          {
            $match: { value: value.toLowerCase().trim() },
          },
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
