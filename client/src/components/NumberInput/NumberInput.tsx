import React, { FC } from "react";
import { NumericFormat } from "react-number-format";

interface NumberInputProps {
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
  suffix?: string;
}

const NumberInput: FC<NumberInputProps> = ({
  label,
  placeholder,
  name,
  id,
  value,
  error,
  smallText,
  smallHref,
  onChange,
  suffix,
}) => {
  const onNumberChange = (val: any) => {
    if (!onChange || !val.replace) return;
    onChange(val.replace(suffix || " PLN", ""));
  };

  return (
    <div className="input-wrapper f-column y-start x-start">
      <span className="input-label">{label}</span>
      <div className="input-holder">
        <NumericFormat
          className={`input ${error && "error"}`}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onNumberChange}
          suffix={suffix}
          decimalScale={2}
          allowedDecimalSeparators={[",", "."]}
          decimalSeparator={","}
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

export default NumberInput;
