import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/svg/arrow.svg";

interface SelectProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  values: any[];
  setNewValue: Dispatch<SetStateAction<any>>;
}

const Select: FC<SelectProps> = ({
  label,
  placeholder,
  defaultValue,
  values,
  setNewValue,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [value, setValue] = useState<any>(defaultValue || placeholder);

  const changeValue = (val: string): void => {
    setValue(val);
    setNewValue(val);
  };

  return (
    <div
      className="select-wrapper f-column y-start x-start"
      data-opened={opened}
    >
      <span className="select-label">{label}</span>
      <div className="select f-column" onClick={() => setOpened(!opened)}>
        <div className="face main-face flex y-center x-between">
          <span className="select-placeholder">{value}</span>
          <ArrowIcon className="icon" width={24} />
        </div>

        <div className="face-list f-column y-center x-start">
          {values?.map((val, i) => (
            <div
              className="face hidden-face"
              key={"face-" + i}
              onClick={() => changeValue(val)}
              style={{}}
            >
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
