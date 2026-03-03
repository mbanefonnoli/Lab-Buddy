import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { ProfileProvider } from "@/components/ProfileProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lab Buddy — Understand Your Lab Results",
    template: "%s | Lab Buddy",
  },
  description:
    "Paste or upload a medical lab report and get a plain-English explanation of every value. Free, private, and easy to understand.",
  keywords: [
    "lab results explained",
    "blood test explanation",
    "medical lab report",
    "lab values normal range",
    "cholesterol blood test",
    "hemoglobin levels",
    "lab buddy",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lab Buddy",
  },
  openGraph: {
    type: "website",
    siteName: "Lab Buddy",
    title: "Lab Buddy — Understand Your Lab Results",
    description:
      "Paste or upload a medical lab report and get a plain-English explanation of every value.",
  },
  twitter: {
    card: "summary",
    title: "Lab Buddy",
    description: "Plain-English explanations of your lab results.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3BADA8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={`${fredoka.variable} font-bubbly antialiased bg-pale-mint`}>
        <AuthProvider>
          <ProfileProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ProfileProvider>
        </AuthProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
