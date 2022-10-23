import React, { FC } from "react";

interface TextareaProps {
  label: string;
  placeholder: string;
  name: string;
  id?: string | undefined;
  value?: string | number | undefined;
  error?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}

const Textarea: FC<TextareaProps> = ({
  label,
  placeholder,
  name,
  id,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="textarea-wrapper f-column y-start x-start">
      <span className="textarea-label">{label}</span>
      <div className="textarea-holder">
        <textarea
          className={`textarea ${error && "error"}`}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && (
        <div className="textarea-error">
          <small className="textarea-error">{error}</small>
        </div>
      )}
    </div>
  );
};

export default Textarea;
