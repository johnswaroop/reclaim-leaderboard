const APP_ID = process.env.APP_ID;

import providerIds from "@/providers";
import { Claim, GoogleUserPayload } from "@/types";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Proof from "@/modal/proof";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { error } from "console";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { providerId, token, proof } = req.body;

  if (proof) {
    console.log("Verification success", proof);
    let user = jwtDecode(token as string) as GoogleUserPayload;
    let selectedProof = providerIds.find((ele) => ele.value == providerId);

    let xpCalculated = selectedProof?.xp || 0;

    try {
      let proofData = proof[0] as Claim;
      let obj = JSON.parse(
        proofData.claimData.parameters as string
      ).paramValues;

      if (obj) {
        console.log(obj);
        let metric = parseInt(`${Object.values(obj)[0]}`);
        if (isNaN(metric)) {
          console.log("Not a number");
        } else {
          xpCalculated = xpCalculated + metric;
        }
      }
    } catch (er) {
      console.log("parsing failed", er);
    }

    let { label, value, email, data, xp } = {
      label: selectedProof?.label,
      value: selectedProof?.value,
      email: user.email,
      data: JSON.stringify(proof),
      xp: xpCalculated,
    };

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
    try {
      const proofDoc = await Proof.create({ label, value, email, data, xp });
    } catch (er) {
      console.log(er);
      return res.status(400).json({ error: "DB operation failed" });
    }
  } else {
    return res.status(400).json({ error: "proof not found" });
  }
  res.status(200).json({ proof });
}
