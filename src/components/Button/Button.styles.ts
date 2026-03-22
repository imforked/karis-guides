import styled, { css } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./Button.types";

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  `,
};

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    color: ${({ theme }) => theme.palette.ink};
    background: ${({ theme }) => theme.color.accent};
    border-color: ${({ theme }) => theme.color.borderStrong};

    &:hover:not(:disabled) {
      filter: brightness(0.96);
    }
  `,
  secondary: css`
    color: ${({ theme }) => theme.color.foreground};
    background: ${({ theme }) => theme.color.surface};
    border-color: ${({ theme }) => theme.color.borderStrong};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.palette.earth};
    }
  `,
  ghost: css`
    color: ${({ theme }) => theme.color.foreground};
    background: transparent;
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.color.surface};
    }
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-weight: 600;
  line-height: 1.25;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    filter 0.15s ease,
    opacity 0.15s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
`;
