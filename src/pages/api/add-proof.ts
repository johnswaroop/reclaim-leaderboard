import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../connectToDatabase";
import Proof from "../../modal/proof";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case "POST":
      try {
        const { label, value, email, data, xp } = req.body;

        if (!label || !value || !email) {
          return res.status(400).json({
            success: false,
            message: "Label, value, and email are required",
          });
        }

        // Check if the proof already exists for that email
        const existingProof = await Proof.findOne({ value, email });

        if (existingProof) {
          return res.status(200).json({
            success: true,
            message: "Proof already exists for this email",
            data: existingProof,
          });
        }

        // Create a new proof
        const proof = await Proof.create({ label, value, email, data, xp });
        res.status(201).json({ success: true, data: proof });
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
