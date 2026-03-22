import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  summary?: ReactNode;
};
