import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FindMe - Find Me an Apartment",
  description: "Find apartments directly from landlords with no agents and no unnecessary fees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F9FAFB] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}
