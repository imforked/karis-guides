"use client";

import {
  BackLink,
  EncoderFields,
  FieldLabel,
  Lead,
  Main,
  MorseChunk,
  MorseVisual,
  MorseWord,
  MorseWordSeparator,
  OutputHint,
  OutputPanel,
  OutputPlaceholder,
  OutputSrText,
  PageIntro,
  Section,
  SectionTitle,
  SkippedNote,
  TextArea,
  TimingNote,
  Title,
} from "./morse-code.styles";
import { encodeLatinToMorse } from "./morse-table";
import { Fragment, useId, useMemo, useState, type ReactNode } from "react";

function MorseVisualOutput({ morse }: { morse: string }) {
  const words = morse.split(" / ");

  return (
    <MorseVisual aria-hidden>
      {words.map((word, wordIndex) => {
        const symbols = word.split(" ").filter((s) => s.length > 0);
        return (
          <Fragment key={`w-${wordIndex}`}>
            {wordIndex > 0 ? <MorseWordSeparator /> : null}
            <MorseWord>
              {symbols.map((symbol, symIndex) => (
                <MorseChunk key={`w-${wordIndex}-s-${symIndex}`}>
                  {symbol}
                </MorseChunk>
              ))}
            </MorseWord>
          </Fragment>
        );
      })}
    </MorseVisual>
  );
}

export function MorseCodeView() {
  const [message, setMessage] = useState("");
  const messageFieldId = useId();

  const { morse, skippedChars } = useMemo(
    () => encodeLatinToMorse(message),
    [message]
  );

  const trimmed = message.trim();
  const outputLabelId = `${messageFieldId}-morse-out-label`;
  const outputHintId = `${messageFieldId}-morse-hint`;

  let outputBody: ReactNode;
  if (morse.length > 0) {
    outputBody = (
      <>
        <OutputSrText>{morse}</OutputSrText>
        <MorseVisualOutput morse={morse} />
      </>
    );
  } else if (trimmed === "") {
    outputBody = (
      <OutputPlaceholder>Morse will appear here as you type.</OutputPlaceholder>
    );
  } else {
    outputBody = (
      <OutputPlaceholder>
        Nothing could be encoded — every character in this message is outside
        the supported set (letters, digits, and common punctuation).
      </OutputPlaceholder>
    );
  }

  return (
    <Main>
      <PageIntro>
        <BackLink href="/">← Home</BackLink>
        <Title>Morse Code Generator</Title>
        <Lead>
          International Morse code. Dots are shown as periods and dashes as
          hyphens. Letters, numbers, and a set of punctuation marks are
          supported; other characters are skipped.
        </Lead>
      </PageIntro>

      <Section aria-labelledby="morse-encode-heading">
        <SectionTitle id="morse-encode-heading">Your message</SectionTitle>
        <EncoderFields>
          <TextArea
            id={messageFieldId}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            rows={4}
            spellCheck
            autoComplete="off"
            aria-labelledby="morse-encode-heading"
            aria-describedby={
              skippedChars.length > 0 ? `${messageFieldId}-skipped` : undefined
            }
          />
          <FieldLabel id={outputLabelId}>
            Morse
            <OutputHint id={outputHintId}>
              Each shaded box is one letter, digit, or punctuation sign. A small
              circle marks a space between words.
            </OutputHint>
          </FieldLabel>
          <OutputPanel
            htmlFor={messageFieldId}
            id={`${messageFieldId}-morse-out`}
            aria-labelledby={outputLabelId}
            aria-describedby={outputHintId}
            aria-live="polite"
          >
            {outputBody}
          </OutputPanel>
          {skippedChars.length > 0 ? (
            <SkippedNote id={`${messageFieldId}-skipped`}>
              Skipped (not supported):{" "}
              {skippedChars.map((ch, i) => (
                <span key={`${ch}-${i}`}>
                  {i > 0 ? ", " : null}
                  <span dir="ltr">{JSON.stringify(ch)}</span>
                </span>
              ))}
            </SkippedNote>
          ) : null}
        </EncoderFields>
      </Section>

      <TimingNote>
        Treat a dot as a short beat. A dash lasts about three beats. After each
        dot or dash within a letter, pause about one beat. Between letters,
        pause about three beats. Between words, pause about seven beats.
      </TimingNote>
    </Main>
  );
}
