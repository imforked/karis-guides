import Link from "next/link";
import styled, { css } from "styled-components";

const drawerRowActionBase = css`
  display: block;
  width: 100%;
  text-align: left;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.foreground};

  &:hover {
    color: ${({ theme }) => theme.palette.earth};
  }
`;

export const StyledDrawerRowActionLink = styled(Link)`
  ${drawerRowActionBase}
`;

export const StyledDrawerRowActionButton = styled.button`
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  ${drawerRowActionBase}
`;
