import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Kari's Guides",
  description: "Kari's Guides",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
