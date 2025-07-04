import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Analytics } from "@vercel/analytics/react"

import '@stream-io/video-react-sdk/dist/css/styles.css';

// import "react-datepicker/dist/react-datepicker.module.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "OPEXN MEET",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <ClerkProvider
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/icons/yoom-logo.svg",
            },
            variables: {
              colorText: "#fff",
              colorPrimary: "#0E78F9",
              colorBackground: "#1C1F2E",
              colorInputBackground: "#252A41",
              colorInputText: "#fff",
            },
          }}
        >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2 `}
      >
          {children}
          <Toaster />
      </body>
        </ClerkProvider>
    </html>
  );
}
