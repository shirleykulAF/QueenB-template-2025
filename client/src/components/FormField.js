// client/src/components/FormField.js
import React, { useState } from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = '',
  className = 'form-group',
  minLength
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type === 'password') {
    return (
      <div className={className}>
        <label htmlFor={name}>
          {label} {required && '*'}
        </label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            minLength={minLength}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {minLength && (
          <div className="password-hint">
            Password must be at least {minLength} characters long
          </div>
        )}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label htmlFor={name}>
          {label} {required && '*'}
        </label>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor={name}>
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        minLength={minLength}
      />
    </div>
  );
};

export default FormField;