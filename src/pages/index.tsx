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
import { toast } from "sonner";

const Hero = () => {
  const [url, seturl] = useState("");
  const [label, setlabel] = useState("");

  const getVerificationReq = async (providerId: string) => {
    const reclaimClient = new Reclaim.ProofRequest(
      process.env.APP_ID as string
    );

    await reclaimClient.buildProofRequest(providerId);

    const APP_SECRET = process.env.APP_SECRET; // your app secret key.

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET as string)
    );

    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest();

    seturl(requestUrl);
    if (window.innerWidth < 500) {
      window.open(url, "_blank");
    }

    reclaimClient.startSession({
      onSuccessCallback: async (proof) => {
        console.log("Verification success", proof);
        let token = localStorage.getItem("token");
        let res = await axios.post("/api/generate-proof", {
          token: token,
          providerId,
          proof,
        });
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
      },
    });
  };

  return (
    <section className="bg-[#00E] min-h-screen flex flex-col w-full h-[880px] max-[1090px]:h-fit relative items-center pb-8 h-fit">
      <Nav />
      <Dots />
      <div className="flex w-[90%] z-10  flex-col   bg-[#FAF4F0] max-w-fit rounded-lg mt-[8vh] p-8 max-[500px]:p-6">
        <h1 className="text-2xl font-medium ">Generate Proof</h1>
        <Combobox value={label} setValue={setlabel} />
        {/* <h1 className="w-[500px] max-[580px]:w-full mt-3">{value}</h1> */}
        <p className="text-gray-600 text-sm mt-6">
          Complete tasks to earn XP and unlock rewards
        </p>
        <Button
          disabled={label == ""}
          onClick={() => {
            let token = localStorage.getItem("token");
            if (!token) {
              return toast("Please Log-In to generate proof!");
            }
            console.log(label);
            let id = providerIds.find(
              (ele) =>
                ele.label.toLocaleLowerCase() == label.toLocaleLowerCase()
            )?.value;
            console.log(id);
            getVerificationReq(id as string);
          }}
          className="bg-[#00E] mt-3 hover:bg-[#0e0ea3]"
        >
          Generate Proof
        </Button>
      </div>

      {url.length > 0 && (
        <div
          key={url}
          className="flex z-10 fadein flex-col   bg-[#FAF4F0] rounded-lg mt-8 p-8 w-fit max-[500px]:p-6"
        >
          <div className="mx-auto flex-col  mt-6 mb-2 w-[80vw] max-w-[500px] flex justify-center items-center">
            <QRCodeComp value={url} />
            <Button
              onClick={() => {
                window.open(url, "_blank");
              }}
              className="mt-8 bg-[#00E]"
            >
              Open Reclaim
            </Button>
          </div>
        </div>
      )}
      <Leaderboard providerName={label} />
    </section>
  );
};

const Leaderboard = ({ providerName }: { providerName: string }) => {
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
  if (data.length == 0) {
    return <></>;
  }

  return (
    <div className="flex z-10 fadein flex-col   bg-[#FAF4F0] rounded-lg mt-8 p-8 w-fit gap-3 max-[500px]:p-6">
      <h1 className="text-2xl font-medium capitalize">
        {providerName} Leaderboard
      </h1>
      <div className="flex flex-col gap-4 mt-2">
        {[...data].map((ele, idx) => {
          return (
            <div
              key={idx + "ld"}
              className=" w-[80vw] max-w-[500px] flex gap-4 bg-white  rounded-lg p-4 items-center"
            >
              <h2 className="bg-[#00E] text-white w-6 h-6 flex justify-center items-center rounded-full max-[500px]:text-sm">
                {idx + 1}
              </h2>
              <h1 className="max-[500px]:text-sm capitalize">{ele.name}</h1>
              <p className="ml-auto font-semibold max-[500px]:text-sm">
                {ele.totalXp}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
