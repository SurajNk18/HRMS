import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISOLATIVE ELECTRICALS | HRMS Portal",
  description: "Smart People Management for a Stronger Tomorrow - Isolative Electricals Private Limited, Khandala, Satara",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
