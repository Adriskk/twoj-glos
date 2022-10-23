import React, { FC, ReactNode } from "react";

interface ButtonProps {
  text: string;
  path?: string | undefined;
  callback?: () => void | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ path, text, callback, type, disabled }) => {
  const CLASSNAME = "button flex y-center x-center";

  return (
    <>
      {path ? (
        <a className={CLASSNAME} href={path}>
          {text}
        </a>
      ) : (
        <button
          type={type}
          className={CLASSNAME}
          onClick={callback}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
