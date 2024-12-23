import "@/app.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Radyo",
  description: "Radyo dinleyebileceğiniz sade bir uygulama",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
      {process.env.NODE_ENV === "production" && <Analytics />}
    </html>
  );
}
