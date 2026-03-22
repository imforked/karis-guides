"use client";

import { Item } from "@/components/SearchBar/components/Item";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  Dropdown,
  DropdownList,
  DropdownListItem,
  Input,
  Root,
} from "./SearchBar.styles";
import type { SearchBarProps, SearchSuggestion } from "./SearchBar.types";

export function SearchBar({
  placeholder = "Search",
  "aria-label": ariaLabel = "Search",
  disabled,
  suggestions = [],
  onSuggestionSelect,
  onFocus,
  onBlur,
  onKeyDown,
  onChange,
  onClick,
  ...rest
}: SearchBarProps) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [listOpen, setListOpen] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearBlurTimeout = useCallback(() => {
    if (blurTimeoutRef.current !== null) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearBlurTimeout();
  }, [clearBlurTimeout]);

  useEffect(() => {
    if (suggestions.length === 0) {
      setListOpen(false);
    }
  }, [suggestions.length]);

  const showDropdown = listOpen && suggestions.length > 0;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    if (suggestions.length > 0) {
      setListOpen(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    blurTimeoutRef.current = setTimeout(() => {
      setListOpen(false);
    }, 180);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === "Escape") {
      setListOpen(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setListOpen(true);
  };

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    if (suggestions.length > 0) {
      setListOpen(true);
    }
  };

  const handleSelect = (suggestion: SearchSuggestion) => {
    onSuggestionSelect?.(suggestion);
    clearBlurTimeout();
    setListOpen(false);
    inputRef.current?.blur();
  };

  return (
    <Root role="search">
      <Input
        ref={inputRef}
        type="search"
        enterKeyHint="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-expanded={showDropdown}
        aria-controls={showDropdown ? listboxId : undefined}
        aria-autocomplete="list"
        aria-haspopup="listbox"
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onClick={handleClick}
        {...rest}
      />
      {showDropdown ? (
        <Dropdown id={listboxId} role="listbox" aria-label={ariaLabel}>
          <DropdownList>
            {suggestions.map((suggestion) => (
              <DropdownListItem key={suggestion.id} role="presentation">
                <Item
                  title={suggestion.title}
                  summary={suggestion.summary}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(suggestion)}
                />
              </DropdownListItem>
            ))}
          </DropdownList>
        </Dropdown>
      ) : null}
    </Root>
  );
}
