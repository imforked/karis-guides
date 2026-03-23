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
