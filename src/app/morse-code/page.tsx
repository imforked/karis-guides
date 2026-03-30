import type { Metadata } from "next";
import { MorseCodeView } from "./morse-code-view";

export const metadata: Metadata = {
  title: "Morse code generator — Kari's Guides",
  description:
    "Turn your message into International Morse code (ITU): dots, dashes, and word spacing.",
};

export default function MorseCodePage() {
  return <MorseCodeView />;
}
