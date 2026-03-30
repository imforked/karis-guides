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
  FieldWrap,
  Input,
  Root,
  SearchAffixButton,
} from "./SearchBar.styles";
import type { SearchBarProps, SearchSuggestion } from "./SearchBar.types";

export function SearchBar({
  placeholder = "Search",
  "aria-label": ariaLabel = "Search",
  disabled,
  suggestions = [],
  onSuggestionSelect,
  onSearch,
  searchButtonAriaLabel = "Search",
  onFocus,
  onBlur,
  onKeyDown,
  onChange,
  onClick,
  ...rest
}: SearchBarProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [listOpen, setListOpen] = useState(false);
  const blurCloseRafRef = useRef<number | null>(null);

  const cancelBlurClose = useCallback(() => {
    if (blurCloseRafRef.current !== null) {
      cancelAnimationFrame(blurCloseRafRef.current);
      blurCloseRafRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => cancelBlurClose();
  }, [cancelBlurClose]);

  const runSearch = useCallback(() => {
    if (!onSearch || disabled) {
      return;
    }
    cancelBlurClose();
    setListOpen(false);
    onSearch();
  }, [cancelBlurClose, disabled, onSearch]);

  const showDropdown = listOpen && suggestions.length > 0;

  useEffect(() => {
    if (!showDropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        cancelBlurClose();
        setListOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [showDropdown, cancelBlurClose]);

  useEffect(() => {
    if (suggestions.length === 0) {
      setListOpen(false);
    }
  }, [suggestions.length]);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    if (suggestions.length > 0) {
      setListOpen(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) {
      return;
    }
    if (next && rootRef.current && !rootRef.current.contains(next)) {
      cancelBlurClose();
      setListOpen(false);
      return;
    }
    cancelBlurClose();
    blurCloseRafRef.current = requestAnimationFrame(() => {
      blurCloseRafRef.current = null;
      if (!rootRef.current?.contains(document.activeElement)) {
        setListOpen(false);
      }
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.key === "Escape") {
      cancelBlurClose();
      setListOpen(false);
    }
    if (
      event.key === "Enter" &&
      onSearch &&
      !event.defaultPrevented &&
      !disabled
    ) {
      event.preventDefault();
      runSearch();
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
    cancelBlurClose();
    setListOpen(false);
    inputRef.current?.blur();
  };

  return (
    <Root ref={rootRef} role="search">
      <FieldWrap>
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
          $withSearchButton={Boolean(onSearch)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onClick={handleClick}
          {...rest}
        />
        {onSearch ? (
          <SearchAffixButton
            type="button"
            disabled={disabled}
            aria-label={searchButtonAriaLabel}
            onPointerDown={(event) => event.preventDefault()}
            onClick={runSearch}
          >
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              focusable="false"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth={2}
              />
              <path
                d="M16.5 16.5L21 21"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </SearchAffixButton>
        ) : null}
      </FieldWrap>
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
