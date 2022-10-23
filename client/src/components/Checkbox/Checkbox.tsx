import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface CheckboxProps {
  checked?: boolean;
  label?: string;
  children?: ReactNode;
  setChecked: Dispatch<SetStateAction<boolean>>;
  error?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  checked = false,
  children,
  setChecked,
  error = false,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const changeValue = (): void => {
    setChecked(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div className="checkbox-wrapper flex y-center x-start">
      <div
        className="checkbox"
        data-checked={isChecked}
        onClick={() => changeValue()}
        data-error={error}
      ></div>

      {children ? (
        <>{children}</>
      ) : (
        <span className="checkbox-label">{label}</span>
      )}
    </div>
  );
};

export default Checkbox;
