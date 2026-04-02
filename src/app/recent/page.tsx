import { RecentView } from "./recent-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recently Viewed — Kari's Guides",
  description:
    "Guides you opened recently. History is stored only on this device.",
};

export default function RecentPage() {
  return <RecentView />;
}
