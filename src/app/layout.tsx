import type { Metadata } from "next";
import { Roboto, Roboto_Mono, DM_Serif_Text } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Textpaper",
  description: "Personalized, interactive, SMS-based news.",
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
        {children}
      </body>
    </html>
  );
}
