/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Arrow from "./Arrow";
import GoogleSignInButton from "./GoogleSignInButton";
import { jwtDecode } from "jwt-decode";
import { GoogleUserPayload } from "@/types";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Nav = () => {
  return (
    <nav className="mx-auto flex justify-between items-center w-full max-w-[1280px] px-4 pt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="171"
        height="40"
        viewBox="0 0 171 40"
        fill="none"
        className="max-[1090px]:w-[120px]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V36C40 38.2091 38.2091 40 36 40H4C1.79086 40 0 38.2091 0 36V4ZM5.41807 39.9997H4C2.24047 39.9997 0.746284 38.8636 0.210967 37.285L4.16425 19.1839C4.18782 19.076 4.29646 18.9885 4.40692 18.9885H9.80692C9.91738 18.9885 9.98781 19.076 9.96425 19.1839L5.41807 39.9997ZM18.2181 39.9997H12.4181L13.5076 35.0109C13.5312 34.903 13.4608 34.8155 13.3503 34.8155H7.9503C7.83985 34.8155 7.76941 34.728 7.79298 34.6201L8.94518 29.3444C8.96875 29.2365 9.0774 29.149 9.18786 29.149H14.5879C14.6983 29.149 14.807 29.0616 14.8305 28.9536L17.0069 18.9885C17.1483 18.3411 16.7257 17.8162 16.063 17.8162H11.663C11.5525 17.8162 11.4821 17.7287 11.5056 17.6208L12.6578 12.3451C12.6814 12.2372 12.7901 12.1497 12.9005 12.1497H21.9005C23.226 12.1497 24.0712 13.1995 23.7884 14.4945L20.6305 28.9536C20.607 29.0616 20.4983 29.149 20.3879 29.149H15.2707C15.1602 29.149 15.0516 29.2365 15.028 29.3444L13.8758 34.6201C13.8523 34.728 13.9227 34.8155 14.0332 34.8155H19.1503C19.2608 34.8155 19.3312 34.903 19.3076 35.0109L18.2181 39.9997ZM5.65785 12.3451C5.68142 12.2372 5.79006 12.1497 5.90052 12.1497H11.3005C11.411 12.1497 11.4814 12.2372 11.4578 12.3451L10.3056 17.6208C10.2821 17.7287 10.1734 17.8162 10.063 17.8162H4.66297C4.55251 17.8162 4.48207 17.7287 4.50564 17.6208L5.65785 12.3451ZM49.9297 16.1859H52.9811V17.4959C54.0035 16.4609 55.2284 15.9368 56.6482 15.9368C57.954 15.9368 59.0327 16.3537 59.8658 17.1966C60.7088 18.0297 61.1256 19.1084 61.1256 20.4142C61.1256 20.5205 61.1152 20.7034 61.0957 20.9569L61.0815 21.1415H57.9156L57.9281 20.9298C57.9378 20.7649 57.9424 20.6426 57.9424 20.5607C57.9424 19.9239 57.7725 19.4267 57.4488 19.0505L57.4472 19.0486L57.4456 19.0467C57.1329 18.6645 56.7313 18.4755 56.2234 18.4755C55.2519 18.4755 54.4238 18.9203 53.7323 19.8455L53.7321 19.8457C53.2427 20.4982 52.9811 21.5208 52.9811 22.9484V30.8095H49.9297V16.1859ZM69.6797 23.997H79.5148L79.5287 23.812C79.558 23.4216 79.5732 23.1413 79.5732 22.9767C79.5732 20.6256 79.04 18.8078 77.9414 17.5566C76.8388 16.3009 75.2291 15.6868 73.1476 15.6868C70.8718 15.6868 69.1405 16.4536 67.9916 18.0092L67.9913 18.0096L67.991 18.01C66.9279 19.4643 66.3997 21.1964 66.3997 23.1964C66.3997 25.5643 67.0096 27.4351 68.2547 28.7814L68.2552 28.782L68.2557 28.7826C69.5129 30.1209 71.2653 30.7792 73.4845 30.7792C75.1253 30.7792 76.4365 30.4932 77.3981 29.8998L77.3988 29.8994L77.3994 29.899C78.37 29.2899 78.9124 28.4089 79.0157 27.2721L79.0355 27.054H75.7927L75.7336 27.1454C75.3523 27.7347 74.691 28.0501 73.6896 28.0501C72.5021 28.0501 71.5424 27.6982 70.7937 27.0052C70.0471 26.3044 69.6715 25.4076 69.6708 24.298L69.6797 23.997ZM75.4389 19.2667L75.4401 19.2678L75.4412 19.2689C75.979 19.7815 76.2722 20.4473 76.312 21.2826H69.6989C69.8318 20.4347 70.1877 19.7648 70.7604 19.2595L70.761 19.2589L70.7616 19.2584C71.3842 18.6998 72.1696 18.416 73.1329 18.416C74.106 18.416 74.8677 18.7045 75.4389 19.2667ZM144.681 9.33691H147.894V13.2965H144.681V9.33691ZM141.211 15.8408H147.894V30.4645H144.681V18.9215H141.211V15.8408ZM129.667 20.1277V21.1436H126.835C124.882 21.1436 123.301 21.5898 122.113 22.5034C120.929 23.4118 120.336 24.6432 120.336 26.1775C120.336 27.5398 120.822 28.6471 121.798 29.4791L121.798 29.4795L121.799 29.4798C122.781 30.3087 124.076 30.7135 125.663 30.7135C127.176 30.7135 128.513 30.2361 129.667 29.2853V30.4645H132.718V21.0799C132.718 19.1732 132.3 17.7554 131.414 16.88C130.528 16.005 129.092 15.5918 127.157 15.5918C125.212 15.5918 123.706 15.9071 122.663 16.5637C121.608 17.2285 121.047 18.2316 120.981 19.5463L120.97 19.7564H124.136L124.182 19.6217C124.356 19.1189 124.678 18.7446 125.159 18.492C125.645 18.2365 126.302 18.1012 127.142 18.1012C128.028 18.1012 128.656 18.283 129.059 18.6127C129.455 18.936 129.667 19.4282 129.667 20.1277ZM126.425 23.6969H129.667V24.449C129.667 25.508 129.289 26.393 128.528 27.1166C127.766 27.841 126.835 28.2041 125.721 28.2041C125.045 28.2041 124.501 27.9958 124.074 27.5873C123.657 27.1689 123.446 26.6453 123.446 26.0018C123.446 25.3095 123.707 24.7623 124.234 24.3423C124.776 23.9182 125.5 23.6969 126.425 23.6969ZM108.622 9.33691V25.0789C108.622 26.0006 108.871 26.6564 109.337 27.0851C109.806 27.5166 110.529 27.75 111.542 27.75H113.648V30.4645H110.765C108.984 30.4645 107.647 29.9864 106.804 28.9872C105.968 27.9961 105.57 26.4394 105.57 24.3611V9.33691H108.622ZM94.1043 20.0654H97.3506L97.3131 19.8335C97.1007 18.5187 96.5053 17.4844 95.5228 16.7471C94.552 16.0015 93.3049 15.637 91.7983 15.637C89.8683 15.637 88.2931 16.3388 87.091 17.7428C85.891 19.1346 85.2995 20.952 85.2995 23.1759C85.2995 24.3107 85.4787 25.416 85.8371 26.4911L85.8374 26.4922L85.8378 26.4932C86.206 27.558 86.7022 28.4246 87.3316 29.0847C88.3838 30.208 89.8529 30.7587 91.7104 30.7587C93.2639 30.7587 94.576 30.3217 95.6327 29.4377C96.6912 28.5522 97.2544 27.4159 97.3155 26.0412L97.3248 25.8324H94.0653L94.0458 26.0106C93.9831 26.5839 93.7301 27.0604 93.2792 27.4481C92.8284 27.8358 92.299 28.0296 91.6811 28.0296C90.6296 28.0296 89.8334 27.6241 89.2675 26.8122C88.7042 25.9899 88.4094 24.7911 88.4094 23.1906C88.4094 21.5338 88.7088 20.3272 89.2763 19.5391C89.835 18.7632 90.6735 18.3661 91.8276 18.3661C92.3962 18.3661 92.8554 18.4998 93.2177 18.7546C93.5801 19.0093 93.8623 19.3969 94.0565 19.9335L94.1043 20.0654ZM156.092 15.8408H159.144V16.6787C160.014 15.9591 160.969 15.5918 162.005 15.5918C162.602 15.5918 163.086 15.6703 163.439 15.8456C163.756 15.9905 164.066 16.2566 164.372 16.6264C165.162 15.9336 166.161 15.5918 167.352 15.5918C168.389 15.5918 169.233 15.9489 169.861 16.6713C170.486 17.3899 170.789 18.334 170.789 19.4832V30.4645H167.738V19.4832C167.738 18.9643 167.629 18.6123 167.444 18.3922C167.265 18.1788 166.989 18.0572 166.576 18.0572C166.032 18.0572 165.644 18.2635 165.382 18.6721C165.109 19.0959 164.959 19.757 164.959 20.6844V30.4645H161.908V19.41C161.908 18.9172 161.799 18.5851 161.617 18.3773C161.439 18.1746 161.162 18.0572 160.746 18.0572C160.205 18.0572 159.821 18.2588 159.562 18.6552C159.293 19.0664 159.144 19.7086 159.144 20.6111V30.4645H156.092V15.8408Z"
          fill="white"
        />
      </svg>
      {/* <span className="flex gap-10  max-[1090px]:mt-6 max-[1090px]:hidden">
        {[
          { name: "Telegram", link: "https://t.me/protocolreclaim" },
          { name: "Twitter", link: "https://x.com/reclaimprotocol" },
          { name: "Github", link: "https://github.com/reclaimprotocol" },
        ].map((ele) => {
          return (
            <p
              onClick={() => {
                window.open(ele.link, "_blank");
              }}
              key={ele.name}
              className="text-white text-[16px] cursor-pointer"
            >
              {ele.name}
            </p>
          );
        })}
      </span> */}
      {/* <button
        onClick={() => {
          window.open("https://t.me/Srijith13", "_blank");
        }}
        className="bg-[#fff] mt-auto rounded-[8px] flex gap-2 text-white justify-center items-center h-[46px] w-[150px] max-[1090px]:w-[130px] max-[1090px]:h-[35px] max-[1090px]:gap-1"
      >
        <p className="text-[#0000EE] text-[15px] max-[1090px]:text-[12px] font-medium">
          Early Access
        </p>
        <Arrow color="#0000EE" />
      </button> */}
      <AuthBtn />
    </nav>
  );
};

const AuthBtn = () => {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState<GoogleUserPayload | undefined>();
  const [hover, sethover] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded as GoogleUserPayload);
    }
    setloading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    location.href = "/";
  };

  if (loading) {
    return <></>;
  } else {
    if (user) {
      return (
        <>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="gap-2">
                <img className="rounded-full h-6" src={user.picture} alt="" />
                <p className="capitalize text-[#0000EE] text-[15px] max-[1090px]:text-[12px] font-medium">
                  {user.name}
                </p>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={signOut}
                  className="text-red-500 cursor-pointer"
                >
                  Sign out
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </>
      );
    } else {
      return <GoogleSignInButton />;
    }
  }
};

export default Nav;
