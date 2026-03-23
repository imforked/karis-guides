import Link from "next/link";
import styled from "styled-components";

export const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 10;
  transform: translateX(-50%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.appMaxWidth};
  padding: 0.65rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surface};
`;

export const Brand = styled(Link)`
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.foreground};
  min-width: 0;

  &:hover {
    color: ${({ theme }) => theme.palette.earth};
  }
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  /* Reserve space for fixed Header so content starts below the bar */
  padding-top: ${({ theme }) => theme.layout.appHeaderOffset};
`;

export const DrawerBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/** Names the drawer for assistive tech; not shown visually. */
export const DrawerVisuallyHiddenTitle = styled.h2`
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

export const DrawerCloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: 0 1px 3px ${({ theme }) => theme.color.shadow};
  color: ${({ theme }) => theme.color.foreground};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.palette.earth};
    background: ${({ theme }) => theme.color.background};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

export const DrawerScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const DrawerSectionLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.textMuted};
`;

export const PlaceholderNav = styled.p`
  font-size: 0.875rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.color.textMuted};
`;
