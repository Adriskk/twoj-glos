import React, { FC } from "react";

interface InputProps {
  label: string;
  placeholder: string;
  type?: "password" | "text" | "number";
  name: string;
  id?: string | undefined;
  value?: string | number | undefined;
  error?: string | undefined;
  smallText?: string | undefined;
  smallHref?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  format?: (value: any) => any | undefined;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  id,
  value,
  error,
  smallText,
  smallHref,
  onChange,
  format,
}) => {
  return (
    <div className="input-wrapper f-column y-start x-start">
      <span className="input-label">{label}</span>
      <div className="input-holder">
        <input
          className={`input ${error && "error"}`}
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          value={format ? format(value) : value}
          onChange={onChange}
        />
      </div>

      {error && (
        <div className="input-error">
          <small className="input-error">{error}</small>
        </div>
      )}

      {smallText && smallHref && (
        <a className="small-input-link" href={smallHref}>
          {smallText}
        </a>
      )}
    </div>
  );
};

export default Input;
