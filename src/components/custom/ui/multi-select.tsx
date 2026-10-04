"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X, Check, Search, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string;
  label: string;
  children?: MultiSelectOption[];
};

export type MultiSelectValue =
  | MultiSelectOption
  | MultiSelectOption[]
  | null
  | undefined;

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: MultiSelectValue;
  onChange: (value: MultiSelectValue) => void;
  placeholder?: string;
  isClearable?: boolean;
  isMulti?: boolean;
  className?: string;
  portal?: boolean;
  loading?: boolean;
  hierarchical?: boolean;
};

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  isMulti = false,
  className = "",
  portal = true,
  loading = false,
  hierarchical = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filterOptionsRecursive = (
    opts: MultiSelectOption[],
    term: string,
  ): MultiSelectOption[] => {
    if (!term) return opts;
    return opts
      .filter((option) => {
        const labelMatch = option.label
          ?.toLowerCase()
          ?.includes(term.toLowerCase());
        const hasMatchingChildren = option.children
          ? filterOptionsRecursive(option.children, term).length > 0
          : false;
        return labelMatch || hasMatchingChildren;
      })
      .map((option) => {
        if (option.children) {
          return {
            ...option,
            children: filterOptionsRecursive(option.children, term),
          };
        }
        return option;
      });
  };

  const filteredOptions = hierarchical
    ? filterOptionsRecursive(options || [], searchTerm)
    : (options || []).filter((option) =>
        option.label?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      );

  const flattenOptions = (
    opts: MultiSelectOption[],
  ): MultiSelectOption[] => {
    const result: MultiSelectOption[] = [];
    for (const opt of opts) {
      result.push(opt);
      if (opt.children) result.push(...flattenOptions(opt.children));
    }
    return result;
  };
  const flatFilteredOptions = hierarchical
    ? flattenOptions(filteredOptions)
    : filteredOptions;
  const flatIndexMap = new Map<string, number>();
  flatFilteredOptions.forEach((opt, i) => flatIndexMap.set(opt.value, i));

  // Resetting on a change is done during render rather than in an effect: an
  // effect would paint one frame with the stale search term and highlight.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    setHighlightedIndex(-1);
    if (!isOpen) setSearchTerm("");
  }

  const [prevSearchTerm, setPrevSearchTerm] = useState(searchTerm);
  if (prevSearchTerm !== searchTerm) {
    setPrevSearchTerm(searchTerm);
    setHighlightedIndex(-1);
  }

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.querySelector(
        `[data-option-index="${highlightedIndex}"]`,
      );
      if (item) item.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const calculatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      if (dropdownRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    const handleScroll = () => {
      if (isOpen) calculatePosition();
    };
    const handleResize = () => {
      if (isOpen) calculatePosition();
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      calculatePosition();
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: MultiSelectOption) => {
    if (isMulti) {
      const currentValue = Array.isArray(value) ? value : [];
      const isAlreadySelected = currentValue.some(
        (item) => item.value === option.value,
      );
      if (isAlreadySelected) {
        onChange(currentValue.filter((item) => item.value !== option.value));
      } else {
        onChange([...currentValue, option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const isSelected = (option: MultiSelectOption) => {
    if (isMulti) {
      return (
        Array.isArray(value) &&
        value.some((item) => item.value === option.value)
      );
    }
    return (
      value !== null &&
      value !== undefined &&
      !Array.isArray(value) &&
      value.value === option.value
    );
  };

  const handleClear = (e: MouseEvent) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
    setSearchTerm("");
  };

  const handleRemoveValue = (e: MouseEvent, option: MultiSelectOption) => {
    e.stopPropagation();
    const currentValue = Array.isArray(value) ? value : [];
    onChange(currentValue.filter((item) => item.value !== option.value));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const optionsCount = flatFilteredOptions.length;
    switch (e.key) {
      case "ArrowDown":
        if (optionsCount === 0) break;
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < optionsCount - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        if (optionsCount === 0) break;
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : optionsCount - 1,
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < optionsCount) {
          e.preventDefault();
          handleSelect(flatFilteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const renderOption = (option: MultiSelectOption, level = 0) => {
    const hasChildren = option.children && option.children.length > 0;
    const selected = isSelected(option);
    const indexForOption = flatIndexMap.get(option.value) ?? -1;

    return (
      <div key={option.value} onClick={(e) => e.stopPropagation()}>
        <li
          data-option-index={indexForOption}
          onClick={(e) => {
            e.stopPropagation();
            handleSelect(option);
          }}
          onMouseEnter={() => setHighlightedIndex(indexForOption)}
          className={cn(
            "flex cursor-pointer items-center py-2 text-sm transition-colors relative",
            selected
              ? "bg-primary/5 text-primary"
              : highlightedIndex === indexForOption
                ? "bg-muted"
                : "hover:bg-muted",
          )}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {isMulti && (
            <div
              className={cn(
                "mr-2 flex h-4 w-4 items-center justify-center rounded flex-shrink-0",
                selected ? "bg-primary/50" : "border border-border",
              )}
            >
              {selected && <Check className="h-3 w-3" />}
            </div>
          )}
          <span className="flex-1">{option.label}</span>
          {!isMulti && selected && (
            <Check className="ml-auto h-4 w-4 text-primary" />
          )}
        </li>
        {hasChildren && (
          <div>
            {option.children!.map((child) => renderOption(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderDropdown = () => (
    <div
      ref={dropdownRef}
      className="absolute overflow-hidden rounded-md border bg-card shadow-lg z-50"
      style={
        portal
          ? {
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 99999,
              maxHeight: "200px",
            }
          : {
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: "200px",
            }
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative border-b border-border">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-0 py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-0 bg-transparent"
          placeholder="Search..."
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <ul
        ref={listRef}
        className="max-h-44 overflow-auto p-1.5 space-y-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <li className="flex items-center justify-center px-3 py-3 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading...
          </li>
        ) : filteredOptions.length === 0 ? (
          <li className="px-3 py-2 text-sm text-muted-foreground">
            {searchTerm ? "No options found" : "No options available"}
          </li>
        ) : hierarchical ? (
          filteredOptions.map((option) => renderOption(option, 0))
        ) : (
          filteredOptions.map((option, idx) => (
            <li
              key={option.value}
              data-option-index={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className={cn(
                "flex cursor-pointer items-center px-3 py-2 text-sm rounded-md transition-all duration-150 font-medium",
                isSelected(option)
                  ? "bg-primary text-primary-foreground font-semibold"
                  : highlightedIndex === idx
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/10 hover:text-primary text-foreground"
              )}
            >
              {isMulti && (
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded",
                    isSelected(option)
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "border border-border",
                  )}
                >
                  {isSelected(option) && <Check className="h-3 w-3" />}
                </div>
              )}
              <span>{option.label}</span>
              {!isMulti && isSelected(option) && (
                <Check className="ml-auto h-4 w-4 text-primary-foreground" />
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );

  const hasValue = isMulti
    ? Array.isArray(value) && value.length > 0
    : value !== null && value !== undefined && !Array.isArray(value);

  return (
    <div ref={containerRef} className={cn("relative transition-all duration-300", isOpen && !portal && "pb-[210px]", className)}>
      <div
        className="flex min-h-10 cursor-pointer items-center justify-between rounded-sm border border-border bg-background px-3 md:py-2.5 py-3 text-sm"
        tabIndex={0}
        onClick={() => !loading && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (
            (e.key === "ArrowDown" || e.key === "ArrowUp") &&
            !isOpen &&
            !loading
          ) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <div
          className={cn(
            "flex flex-1 items-center gap-1",
            isMulti ? "overflow-hidden whitespace-nowrap" : "flex-wrap",
          )}
        >
          {isMulti ? (
            Array.isArray(value) && value.length > 0 ? (
              <div className="flex gap-1 overflow-hidden">
                {value.length <= 3 ? (
                  value.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs flex-shrink-0"
                    >
                      {item.label}
                      <button
                        onClick={(e) => handleRemoveValue(e, item)}
                        className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs flex-shrink-0">
                      {value[0].label}
                      <button
                        onClick={(e) => handleRemoveValue(e, value[0])}
                        className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs flex-shrink-0">
                      +{value.length - 1} more
                    </div>
                  </>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )
          ) : value && !Array.isArray(value) ? (
            <span>{value.label}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center">
          {isClearable && hasValue && !loading && (
            <button
              onClick={handleClear}
              className="mr-1 rounded-full p-1 text-muted-foreground hover:bg-muted cursor-pointer hover:text-muted-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin ml-2 text-muted-foreground" />
          ) : (
            <ChevronDown
              className={`h-4 w-4 transition-transform ml-2 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <>
          {portal && typeof window !== "undefined" ? (
            createPortal(renderDropdown(), document.body)
          ) : (
            <div className="absolute z-50 mt-1 w-full">{renderDropdown()}</div>
          )}
        </>
      )}
    </div>
  );
}
