import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1rem 2rem;
  background: ${({ theme }) => theme.color.background};
`;

export const PageIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.textMuted};
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.color.foreground};
  }
`;

export const Title = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Lead = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.45;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textMuted};
`;

export const TimingNote = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.5;
  padding-top: 0.25rem;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.foreground};
`;

export const OutputHint = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.textMuted};
`;

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 5.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.35;
  font-weight: 500;
  color: ${({ theme }) => theme.color.foreground};
  background: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: 10px;
  resize: vertical;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.color.textMuted};
    font-weight: 400;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.palette.earth};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.palette.earth};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.accent};
  }
`;

export const EncoderFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OutputPanel = styled.output`
  position: relative;
  display: block;
  margin: 0;
  padding: 0.5rem 0.75rem;
  min-height: 3rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.foreground};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 10px;
`;

/** Plain linear Morse for screen readers (visual layout uses chunks below). */
export const OutputSrText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const MorseVisual = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.65rem;
  font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo,
    monospace;
  letter-spacing: 0.06em;
`;

export const MorseWord = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
`;

export const MorseChunk = styled.span`
  display: inline-block;
  padding: 0.2rem 0.35rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.border};
  line-height: 1.35;
`;

export const OutputPlaceholder = styled.span`
  color: ${({ theme }) => theme.color.textMuted};
  font-style: italic;
  letter-spacing: normal;
`;

export const SkippedNote = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.textMuted};
  line-height: 1.45;
`;
