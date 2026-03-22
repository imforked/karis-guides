import type { InputHTMLAttributes } from "react";

export type SearchSuggestion = {
  id: string;
  title: string;
  summary?: string;
};

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  suggestions?: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
};
