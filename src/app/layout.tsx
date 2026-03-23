import { AppFrame } from "@/components/AppFrame";
import type { Metadata } from "next";
import { AppShell, GlobalStyles } from "./globals.styles";
import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Kari's Guides",
  description:
    "Offline survival and field guides — search, topics, and PDFs on your network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <GlobalStyles />
          <AppShell>
            <AppFrame>{children}</AppFrame>
          </AppShell>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
