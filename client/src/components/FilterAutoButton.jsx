import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

/* Small helpers */
const summarize = (arr) => {
  if (!arr?.length) return "All";
  return arr.length === 1 ? arr[0] : `${arr.length} selected`;
};

export default function FilterAutoButton({
  label,
  options,
  value,
  onChange,
  placeholder = "Select…",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filterWrap">
      {/* Header button that opens the list */}
      <button
        type="button"
        className={`filterBtn${open ? " isOpen" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="filterBtnLabel">{label}</span>
        <span className="filterBtnValue">{summarize(value)}</span>
        <svg aria-hidden="true" className={`chev ${open ? "up" : ""}`} viewBox="0 0 20 20">
          <path d="M5 7l5 6 5-6" />
        </svg>
      </button>

      {/* Invisible Autocomplete that controls the dropdown */}
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={options}
        value={value}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={(_, reason) => {
          if (reason !== "toggleInput") setOpen(false);
        }}
        onChange={(_, newValue) => onChange(newValue)}
        renderTags={() => null}                 /* no chips in the header */
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <label className="optRow" style={{ width: "100%", cursor: "pointer" }}>
              <input type="checkbox" checked={selected} readOnly />
              <span>{option}</span>
            </label>
          </li>
        )}
        /* We render a hidden input so Autocomplete works, but UI stays as a button */
        renderInput={(params) => (
          <div
            ref={params.InputProps.ref}
            style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}
          >
            <input {...params.inputProps} aria-label={label} placeholder={placeholder} />
          </div>
        )}
        /* Popper sits under the button and uses our styles */
        ListboxProps={{ className: "optionsList" }}
        slotProps={{
          paper: { className: "filterPanel" },
        }}
      />
    </div>
  );
}
