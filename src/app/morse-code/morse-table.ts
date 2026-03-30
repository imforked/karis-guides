const MORSE_LETTERS: readonly { char: string; morse: string }[] = [
  { char: "A", morse: ".-" },
  { char: "B", morse: "-..." },
  { char: "C", morse: "-.-." },
  { char: "D", morse: "-.." },
  { char: "E", morse: "." },
  { char: "F", morse: "..-." },
  { char: "G", morse: "--." },
  { char: "H", morse: "...." },
  { char: "I", morse: ".." },
  { char: "J", morse: ".---" },
  { char: "K", morse: "-.-" },
  { char: "L", morse: ".-.." },
  { char: "M", morse: "--" },
  { char: "N", morse: "-." },
  { char: "O", morse: "---" },
  { char: "P", morse: ".--." },
  { char: "Q", morse: "--.-" },
  { char: "R", morse: ".-." },
  { char: "S", morse: "..." },
  { char: "T", morse: "-" },
  { char: "U", morse: "..-" },
  { char: "V", morse: "...-" },
  { char: "W", morse: ".--" },
  { char: "X", morse: "-..-" },
  { char: "Y", morse: "-.--" },
  { char: "Z", morse: "--.." },
] as const;

const MORSE_DIGITS: readonly { char: string; morse: string }[] = [
  { char: "0", morse: "-----" },
  { char: "1", morse: ".----" },
  { char: "2", morse: "..---" },
  { char: "3", morse: "...--" },
  { char: "4", morse: "....-" },
  { char: "5", morse: "....." },
  { char: "6", morse: "-...." },
  { char: "7", morse: "--..." },
  { char: "8", morse: "---.." },
  { char: "9", morse: "----." },
] as const;

const MORSE_PUNCTUATION: readonly { char: string; morse: string }[] = [
  { char: ".", morse: ".-.-.-" },
  { char: ",", morse: "--..--" },
  { char: "?", morse: "..--.." },
  { char: "'", morse: ".----." },
  { char: "!", morse: "-.-.--" },
  { char: "/", morse: "-..-." },
  { char: "(", morse: "-.--." },
  { char: ")", morse: "-.--.-" },
  { char: "&", morse: ".-..." },
  { char: ":", morse: "---..." },
  { char: ";", morse: "-.-.-." },
  { char: "=", morse: "-...-" },
  { char: "+", morse: ".-.-." },
  { char: "-", morse: "-....-" },
  { char: "_", morse: "..--.-" },
  { char: '"', morse: ".-..-." },
  { char: "$", morse: "...-..-" },
  { char: "@", morse: ".--.-." },
] as const;

const CHAR_TO_MORSE = new Map<string, string>();
for (const row of [
  ...MORSE_LETTERS,
  ...MORSE_DIGITS,
  ...MORSE_PUNCTUATION,
]) {
  CHAR_TO_MORSE.set(row.char, row.morse);
}

export type EncodeMorseResult = {
  morse: string;
  skippedChars: string[];
};

function lookupChar(ch: string): string | undefined {
  if (/[a-z]/.test(ch)) {
    return CHAR_TO_MORSE.get(ch.toUpperCase());
  }
  return CHAR_TO_MORSE.get(ch);
}

/** Letters, digits, and supported punctuation; spaces become word breaks (` / `). */
export function encodeLatinToMorse(input: string): EncodeMorseResult {
  const skipped = new Set<string>();
  const trimmed = input.trim();
  if (trimmed === "") {
    return { morse: "", skippedChars: [] };
  }

  const words = input.split(/\s+/).filter((w) => w.length > 0);
  const morseWords: string[] = [];

  for (const word of words) {
    const parts: string[] = [];
    for (const ch of word) {
      const m = lookupChar(ch);
      if (m === undefined) {
        skipped.add(ch);
        continue;
      }
      parts.push(m);
    }
    if (parts.length > 0) {
      morseWords.push(parts.join(" "));
    }
  }

  return {
    morse: morseWords.join(" / "),
    skippedChars: [...skipped],
  };
}
