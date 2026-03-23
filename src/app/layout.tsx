import { AppFrame } from "@/components/AppFrame";
import type { Metadata, Viewport } from "next";
import { AppShell, GlobalStyles } from "./globals.styles";
import StyledComponentsRegistry from "./lib/registry";

export const metadata: Metadata = {
  title: "Kari's Guides",
  description:
    "Offline survival and field guides — search, topics, and PDFs on your network.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Kari's Guides",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/pwa-icon.svg",
    apple: "/pwa-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#BBA387",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
