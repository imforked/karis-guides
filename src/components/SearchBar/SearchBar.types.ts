import type { InputHTMLAttributes } from "react";

export type SearchSuggestion = {
  id: string;
  title: string;
  summary?: string;
};

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  suggestions?: SearchSuggestion[];
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /** When set, a search control is shown and Enter submits; call this to apply the query (e.g. filter a list). */
  onSearch?: () => void;
  /** Accessible label for the search submit control. */
  searchButtonAriaLabel?: string;
};
