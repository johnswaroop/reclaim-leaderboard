/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import QRCodeComp from "react-qr-code";
//hero section
import Nav from "@/components/Nav";
import Dots from "@/components/Dots";
import { Combobox } from "@/components/CustomComboBox";
import { Button } from "@/components/ui/button";

import { Reclaim } from "@reclaimprotocol/js-sdk";
import providerIds from "@/providers";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleUserPayload } from "@/types";
import { toast } from "sonner";

const Leaderboard = () => {
  return (
    <section className="bg-[#00E] min-h-screen flex flex-col w-full h-[880px] max-[1090px]:h-fit relative items-center">
      <Nav />
      <Dots />
      <h1 className="capitalize text-white text-4xl mt-8">Leaderboard</h1>
      {<LeaderboardComp />}
    </section>
  );
};

const LeaderboardComp = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState<
    { email: string; totalXp: number; name: string; picture: string }[]
  >([]);

  useEffect(() => {
    axios.get(`/api/leaderboard`).then((res) => {
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
      <h1 className="text-2xl font-medium ">Leaderboard</h1>
      <div className="flex flex-col gap-4 mt-2">
        {data.slice(0, 10).map((ele, idx) => {
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

export default Leaderboard;
