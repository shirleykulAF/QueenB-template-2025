import React from "react";

/**
 * A reusable multi-select dropdown.
 * label: the name of the property to filter
 * options: string[] of all possible values
 * value: string[] of chosen values
 * onChange: update selection when choosing new value
 */

export default function MultiSelect({ label, options, value, onChange }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 220 }}>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
      <select
        multiple
        value={value}
        onChange={(e) =>
          onChange([...e.target.selectedOptions].map((o) => o.value))
        }
        style={{
          minHeight: 96,
          padding: 6,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          fontSize: 14,
          background: "#fff",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <small style={{ color: "#6b7280" }}>
        Tip: Ctrl/Cmd-click to select multiple
      </small>
    </label>
  );
}

