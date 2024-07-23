import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "./../../connectToDatabase";
import User from "../../modal/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "POST":
      try {
        const { name, email, picture } = req.body;

        if (!name || !email) {
          return res
            .status(400)
            .json({ success: false, message: "Name and email are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(200).json({
            success: true,
            message: "User already exists",
            data: existingUser,
          });
        }

        // Create a new user
        const user = await User.create({ name, email, picture });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: (error as Error).message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
