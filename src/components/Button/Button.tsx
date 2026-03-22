"use client";

import { StyledButton } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} type={type} {...rest} />
  );
}
