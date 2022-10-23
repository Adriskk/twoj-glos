import React, { FC } from "react";

interface RadioInputProps {
  title: string;
  name: string;
  inputs: { label: string; checked?: boolean; value: any }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: FC<RadioInputProps> = ({ title, name, inputs, onChange }) => {
  return (
    <div className="radio-input-wrapper f-column y-start x-start">
      <span className="radio-input-list-title">{title}</span>

      <div className="radio-input-list f-column y-start x-start">
        {inputs?.map((input, i) => (
          <div
            className="input-group-wrapper flex y-center x-start"
            key={"radio-" + i}
          >
            <input
              type="radio"
              name={name}
              checked={input?.checked}
              value={input?.value}
              onChange={onChange}
            />
            <label className="radio-input-label">{input?.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
