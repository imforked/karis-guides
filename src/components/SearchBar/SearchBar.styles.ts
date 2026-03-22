import styled from "styled-components";

export const Root = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.35;
  font-weight: 500;
  color: ${({ theme }) => theme.color.foreground};
  background: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: 10px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index: 50;
  left: 0;
  right: 0;
  top: calc(100% + 4px);
  max-height: min(50vh, 16rem);
  overflow: auto;
  padding: 0.35rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  box-shadow: 0 8px 24px ${({ theme }) => theme.color.shadow};
`;

export const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DropdownListItem = styled.li`
  margin: 0;
  padding: 0;
`;
