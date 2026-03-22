import styled, { css } from "styled-components";
import type { DrawerSide } from "./Drawer.types";

const panelTransforms: Record<
  DrawerSide,
  { closed: ReturnType<typeof css>; open: ReturnType<typeof css> }
> = {
  left: {
    closed: css`
      transform: translateX(-100%);
    `,
    open: css`
      transform: translateX(0);
    `,
  },
  right: {
    closed: css`
      transform: translateX(100%);
    `,
    open: css`
      transform: translateX(0);
    `,
  },
  bottom: {
    closed: css`
      transform: translateY(100%);
    `,
    open: css`
      transform: translateY(0);
    `,
  },
};

export const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.palette.ink};
  opacity: ${({ $open }) => ($open ? 0.35 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.28s ease;
`;

const sidePanelCss: Record<DrawerSide, ReturnType<typeof css>> = {
  left: css`
    top: 0;
    bottom: 0;
    left: 0;
    width: min(88vw, 20rem);
    max-width: 100%;
    border-radius: 0 12px 12px 0;
  `,
  right: css`
    top: 0;
    bottom: 0;
    right: 0;
    width: min(88vw, 20rem);
    max-width: 100%;
    border-radius: 12px 0 0 12px;
  `,
  bottom: css`
    left: 0;
    right: 0;
    bottom: 0;
    max-height: min(88vh, 28rem);
    width: 100%;
    border-radius: 12px 12px 0 0;
  `,
};

export const Panel = styled.div<{ $open: boolean; $side: DrawerSide }>`
  position: fixed;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => theme.color.surface};
  color: ${({ theme }) => theme.color.foreground};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  box-shadow: 0 8px 32px ${({ theme }) => theme.color.shadow};
  transition: transform 0.28s ease;
  ${({ $side }) => sidePanelCss[$side]}
  ${({ $open, $side }) => ($open ? panelTransforms[$side].open : panelTransforms[$side].closed)}
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;
