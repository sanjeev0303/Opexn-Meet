import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React from "react";

interface RootProps {
  children: React.ReactNode;
}


export const metadata: Metadata = {
    title: "OPEXN MEET",
    description: "Video calling app",
    icons: {
      icon: '/icons/logo.svg'
    }
  };

const RootLayout = ({ children }: RootProps) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
