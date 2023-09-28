import "@/styles/globals.css";
import type { Metadata } from "next";
import Background from "@/components/atoms/Background";
import NavigationBar from "@/components/molecules/NavigationBar";
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Malgun Gothic", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Thunder bowling",
  description: "Generated by thunder bowling",
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>

      <body className={`bg-[#F6F6F6] ${notoSans.className}`}>
        <NavigationBar />
        <Background>{children}</Background>
        {modal}
      </body>
    </html>
  );
}
