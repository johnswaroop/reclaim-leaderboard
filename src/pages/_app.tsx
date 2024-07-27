import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster dir="auto" position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
