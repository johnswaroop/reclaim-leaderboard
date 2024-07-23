/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import QRCodeComp from "react-qr-code";
//hero section
import Nav from "@/components/Nav";
import Dots from "@/components/Dots";
import { Combobox } from "@/components/ComboBox";
import { Button } from "@/components/ui/button";

import { Reclaim } from "@reclaimprotocol/js-sdk";
import providerIds from "@/providers";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleUserPayload } from "@/types";

const Hero = () => {
  const [url, seturl] = useState("");
  const [value, setvalue] = useState("");

  const getVerificationReq = async (providerId: string) => {
    const APP_ID = process.env.APP_ID;
    const reclaimClient = new Reclaim.ProofRequest(APP_ID as string);

    await reclaimClient.buildProofRequest(providerId);
    const APP_SECRET = process.env.APP_SECRET; // your app secret key.
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET as string)
    );
    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    seturl(requestUrl);

    await reclaimClient.startSession({
      onSuccessCallback: async (proof) => {
        console.log("Verification success", proof);
        // Your business logic here
        let token = localStorage.getItem("token");
        let user = jwtDecode(token as string) as GoogleUserPayload;
        let selectedProof = providerIds.find((ele) => ele.value == providerId);
        let res = await axios.post("/api/add-proof", {
          label: selectedProof?.label,
          value: selectedProof?.value,
          email: user.email,
          data: JSON.stringify(proof),
          xp: selectedProof?.xp,
        });
        if (res.status == 200 || res.status == 201) {
          seturl("");
        }
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  };

  return (
    <section className="bg-[#00E] min-h-screen flex flex-col w-full h-[880px] max-[1090px]:h-fit relative items-center">
      <Nav />
      <Dots />
      <div className="flex w-full z-10  flex-col   bg-[#FAF4F0] max-w-fit rounded-lg mt-[8vh] p-8">
        <h1 className="text-2xl font-medium ">Select a Provider</h1>
        <Combobox value={value} setValue={setvalue} />
        <p className="text-gray-600 text-sm mt-2">
          Complete tasks to earn XP and unlock rewards
        </p>
        <Button
          onClick={() => {
            console.log(value);
            let id = providerIds.find(
              (ele) => ele.label.toLocaleLowerCase() == value
            )?.value;
            console.log(id);
            getVerificationReq(id as string);
          }}
          className="bg-[#00E] mt-6 hover:bg-[#0e0ea3]"
        >
          Generate Proof
        </Button>
      </div>

      {url.length > 0 && (
        <div
          key={url}
          className="flex z-10 fadein flex-col   bg-[#FAF4F0] rounded-lg mt-8 p-8 w-fit"
        >
          <div className="mx-auto flex-col  mt-6 mb-2 w-[80vw] max-w-[500px] flex justify-center items-center">
            <QRCodeComp value={url} />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              className="mt-8 bg-[#00E]"
            >
              Copy link
            </Button>
          </div>
        </div>
      )}
      <Leaderboard />
    </section>
  );
};

const Leaderboard = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState<
    { email: string; totalXp: number; name: string; picture: string }[]
  >([]);

  useEffect(() => {
    axios.get("/api/leaderboard").then((res) => {
      setdata(res.data.data);
      setloading(false);
    });
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <div className="flex z-10 fadein flex-col   bg-[#FAF4F0] rounded-lg mt-8 p-8 w-fit gap-3">
      <h1 className="text-2xl font-medium ">Leaderboard</h1>
      <div className="flex flex-col gap-4 mt-2">
        {[...data].map((ele, idx) => {
          return (
            <div
              key={idx + "ld"}
              className=" w-[80vw] max-w-[500px] flex gap-4 bg-white  rounded-lg p-4"
            >
              <h2 className="bg-[#00E] text-white w-6 h-6 flex justify-center items-center rounded-full">
                {idx + 1}
              </h2>
              <h1>{ele.email}</h1>
              <p className="ml-auto font-semibold">{ele.totalXp}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
