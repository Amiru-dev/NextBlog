import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextBlog - Full-Stack Next.js 15 Platform",
  description: "A comprehensive blog platform showcasing all Next.js features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
