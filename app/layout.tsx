import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProfileProvider } from "@/components/ProfileProvider";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lab Buddy",
  description:
    "Paste or upload a medical lab report and get a plain-English explanation of every value.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${fredoka.variable} font-bubbly antialiased bg-pale-mint`}>
        <AuthProvider>
          <ProfileProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
