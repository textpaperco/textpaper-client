import type { Metadata } from "next";
import {
  Roboto_Mono,
  DM_Serif_Text,
  Poppins,
} from "next/font/google";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  weight: "400",
  subsets: ["latin"],
});

const description =
  "Personalized news, delivered via SMS. No apps, no clluter. Stay informed and ask questions to dig deeper.";
export const metadata: Metadata = {
  title: "Textpaper",
  description,
  openGraph: {
    images: "/coming-soon.png",
    description,
    url: "https://textpaper.co",
    siteName: "Textpaper",
    type: "website",
    title: "Textpaper",
  },
  icons: {
    icon: "/favicon/favicon-32x32.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${robotoMono.variable} ${dmSerifText.variable} antialiased`}>
        <NextTopLoader color="var(--foreground)" />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
