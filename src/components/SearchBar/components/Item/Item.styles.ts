import styled from "styled-components";

export const StyledItem = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0.65rem;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.background};
  border: 1px solid transparent;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.surface};
    border-color: ${({ theme }) => theme.color.border};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.palette.earth};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.accent};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const ItemTitle = styled.span`
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.foreground};
`;

export const ItemSummary = styled.span`
  display: block;
  margin-top: 0.2rem;
  font-size: 0.75rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.color.textMuted};
`;
