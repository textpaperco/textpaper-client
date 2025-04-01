import type { Metadata } from "next";
import { Roboto, Roboto_Mono, DM_Serif_Text } from "next/font/google";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} ${dmSerifText.variable} antialiased`}>
        <NextTopLoader color="var(--foreground)" />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
