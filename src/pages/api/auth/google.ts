// pages/api/auth/google.js
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { token } = req.body;

  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Create a session token (JWT)
    const sessionToken = jwt.sign(
      JSON.stringify(payload),
      process.env.JWT_SECRET as string
    );

    res.status(200).json({ success: true, token: sessionToken, user: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid token" });
  }
}
