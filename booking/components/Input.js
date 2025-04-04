import React from 'react';

// Input component for forms
const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        required={required}
        {...props}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
