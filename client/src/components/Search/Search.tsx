import React, { FC, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

// * Resources.
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";

interface SearchProps {
  placeholder: string;
  setExtendingValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FC<SearchProps> = ({ placeholder, setExtendingValue }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      console.log(value);
      setValue("");
    }
  };

  const DEBOUNCE_DELAY = 1000;
  const debounced = useDebouncedCallback((val: string) => {
    setExtendingValue(val.trimEnd());
  }, DEBOUNCE_DELAY);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value.trimStart();
    setValue(v);
    debounced(v);
  };

  const onSearchClick = (): void => {
    setIsOpened(!isOpened);
    if (isOpened && inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="search" data-opened={isOpened}>
      <div
        className="trigger-btn flex y-center x-center"
        onClick={onSearchClick}
      >
        <SearchIcon width={24} className="icon" />
      </div>

      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          className="search-input"
          placeholder={placeholder}
          onKeyDown={handleKeyPress}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Search;
