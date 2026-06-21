"use client";

import "react-international-phone/style.css";

import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  memo,
  useEffect,
} from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
} from "react-international-phone";
import type { CountryData } from "react-international-phone";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js/mobile";

// ─── Sorted country list (computed once at module level) ──────────────────────

const EXCLUDED_ISO2 = new Set(["in", "il"]);

const SORTED_COUNTRIES: CountryData[] = [...defaultCountries]
  .filter(c => !EXCLUDED_ISO2.has(parseCountry(c).iso2))
  .sort((a, b) => parseCountry(a).name.localeCompare(parseCountry(b).name));

// ─── Validation utility (exported for parent form use) ────────────────────────

export function validatePhone(e164: string, countryIso2: string): string | null {
  const digits = e164.replace(/\D/g, "");
  if (!e164 || digits.length < 7) {
    return "Mobile number is required";
  }
  const cc = countryIso2.toUpperCase() as Parameters<typeof isValidPhoneNumber>[1];
  try {
    if (!isValidPhoneNumber(e164, cc)) {
      return "Please enter a valid mobile number for the selected country";
    }
  } catch {
    return "Please enter a valid mobile number for the selected country";
  }
  let type: ReturnType<ReturnType<typeof parsePhoneNumber>["getType"]>;
  try {
    type = parsePhoneNumber(e164, cc).getType();
  } catch {
    return "Please enter a valid mobile number for the selected country";
  }
  if (type === "MOBILE" || type === "FIXED_LINE_OR_MOBILE") return null;
  if (type === "FIXED_LINE") return "Please enter a mobile number, not a landline";
  if (type === "TOLL_FREE" || type === "PREMIUM_RATE") return "Please enter a valid mobile number";
  if (type === "VOIP") return "Please enter a mobile number, not a VOIP number";
  return "Please enter a valid mobile number for the selected country";
}

// ─── Country list items (memoised, lazy-rendered) ─────────────────────────────

const CountryListItems = memo(function CountryListItems({
  search,
  selectedIso2,
  onSelect,
}: {
  search: string;
  selectedIso2: string;
  onSelect: (iso2: string) => void;
}) {
  const filtered = useMemo(() => {
    if (!search) return SORTED_COUNTRIES;
    const q = search.toLowerCase();
    const numericQ = q.replace(/\D/g, "");
    return SORTED_COUNTRIES.filter((c) => {
      const { name, dialCode } = parseCountry(c);
      return (
        name.toLowerCase().includes(q) ||
        (numericQ && dialCode.includes(numericQ))
      );
    });
  }, [search]);

  if (filtered.length === 0) {
    return (
      <li className="px-3 py-6 text-center text-gray-400 text-sm list-none">
        No results
      </li>
    );
  }

  return (
    <>
      {filtered.map((c) => {
        const { name, iso2, dialCode } = parseCountry(c);
        const isSelected = iso2 === selectedIso2;
        return (
          <li
            key={iso2}
            role="option"
            aria-selected={isSelected}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(iso2);
            }}
            className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors ${
              isSelected
                ? "bg-gold/10 text-navy-900 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FlagImage iso2={iso2} size="16px" className="shrink-0" />
            <span className="flex-1 truncate">{name}</span>
            <span className="text-gray-400 text-xs shrink-0">
              +{dialCode}
            </span>
          </li>
        );
      })}
    </>
  );
});

// ─── Props ────────────────────────────────────────────────────────────────────

interface PhoneInputFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  value: string;
  countryIso2: string;
  onChange: (e164: string, countryIso2: string) => void;
  error?: string;
  onClearError?: () => void;
  disabledStyle?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PhoneInputField({
  id = "phone",
  label = "Mobile Number",
  required = false,
  value,
  countryIso2,
  onChange,
  error,
  onClearError,
  disabledStyle = false,
}: PhoneInputFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [liveValid, setLiveValid] = useState<boolean | null>(() => {
    if (!value) return null;
    const digits = value.replace(/\D/g, "");
    if (digits.length < 8) return null;
    return !validatePhone(value, countryIso2 || "us");
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const { inputValue, country, setCountry, handlePhoneValueChange } =
    usePhoneInput({
      defaultCountry: countryIso2 || "us",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone, data.country.iso2);
        // Live validation
        const digits = data.phone.replace(/\D/g, "");
        if (digits.length < 8) {
          setLiveValid(null);
        } else {
          const err = validatePhone(data.phone, data.country.iso2);
          setLiveValid(!err);
        }
      },
      inputRef: phoneInputRef,
    });

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedSearch(val), 300);
  }

  const handleSelectCountry = useCallback(
    (iso2: string) => {
      setLiveValid(null);
      setCountry(iso2, { focusOnInput: true });
      setOpen(false);
      setSearch("");
      setDebouncedSearch("");
      if (onClearError) onClearError();
    },
    [setCountry, onClearError]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    // Normalize IDD prefix 00XX → +XX (used in many countries instead of + prefix)
    if (/^00\d/.test(raw.replace(/[\s\-()]/g, ""))) {
      const normalized = "+" + raw.replace(/^00/, "").replace(/[\s\-()]/g, "");
      const fakeEvent = { target: { value: normalized } } as React.ChangeEvent<HTMLInputElement>;
      handlePhoneValueChange(fakeEvent);
      if (onClearError) onClearError();
      return;
    }
    handlePhoneValueChange(e);
    if (onClearError) onClearError();
  }

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
        setDebouncedSearch("");
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  useEffect(() => {
    if (open && searchInputRef.current) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  const hasErr = !!error;
  const borderClass = hasErr
    ? "border-red-400 focus-within:ring-red-300/40 focus-within:border-red-400"
    : liveValid === true
    ? "border-emerald-400 focus-within:ring-emerald-300/40 focus-within:border-emerald-400"
    : "border-gray-200 focus-within:ring-gold/40 focus-within:border-gold";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-navy-900">
        {label}
        {required && (
          <span className="text-gold ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div ref={wrapperRef} className="relative">
        {/* Combined input row */}
        <div
          className={`flex w-full border rounded-lg bg-white focus-within:outline-none focus-within:ring-2 transition-colors${disabledStyle ? " disabled:bg-gray-50" : ""} ${borderClass}`}
        >
          {/* Country selector trigger */}
          <button
            type="button"
            aria-label={`Country: ${country.name}, dial code +${country.dialCode}. Click to change.`}
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 pl-3 pr-2.5 py-3 border-r border-gray-200 shrink-0 hover:bg-gray-50 transition-colors rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold/40 focus:z-10"
          >
            <FlagImage iso2={country.iso2} size="16px" className="shrink-0" />
            <span className="text-gray-600 text-xs font-medium">
              +{country.dialCode}
            </span>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`text-gray-400 transition-transform duration-150 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path d="M1 1l4 4 4-4" />
            </svg>
          </button>

          {/* Phone number input */}
          <input
            ref={phoneInputRef}
            id={id}
            type="tel"
            autoComplete="tel"
            aria-invalid={hasErr}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="212 555 0100"
            className="flex-1 px-3 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none bg-transparent rounded-r-lg min-w-0"
          />
        </div>

        {/* Dropdown — only mounts when open */}
        {open && (
          <div
            className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            role="dialog"
            aria-label="Select country"
          >
            <div className="p-2 border-b border-gray-100">
              <input
                ref={searchInputRef}
                type="text"
                aria-label="Search countries"
                placeholder="Search country or dial code…"
                value={search}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
              />
            </div>
            <ul
              role="listbox"
              aria-label="Countries"
              className="overflow-y-auto max-h-52"
            >
              <CountryListItems
                search={debouncedSearch}
                selectedIso2={country.iso2}
                onSelect={handleSelectCountry}
              />
            </ul>
          </div>
        )}
      </div>

      {/* Reserved space for error — prevents CLS */}
      <div style={{ minHeight: "1.25rem" }}>
        {hasErr && (
          <p
            className="text-red-500 text-xs mt-0.5 flex items-center gap-1"
            role="alert"
          >
            <span aria-hidden="true">↑</span> {error}
          </p>
        )}
      </div>

      {/* Dynamic phone hint */}
      {!error && (
        liveValid === true ? (
          <p className="text-sm flex items-center gap-1 text-emerald-600">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            Valid mobile number
          </p>
        ) : liveValid === false ? (
          <p className="text-sm flex items-center gap-1 text-red-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Mobile only — landlines and VoIP not accepted
          </p>
        ) : (
          <p className="text-xs text-gray-400">Mobile number — include country code</p>
        )
      )}
    </div>
  );
}
