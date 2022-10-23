import React, { Dispatch, FC, SetStateAction } from "react";

interface HamburgerProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const Hamburger: FC<HamburgerProps> = ({ opened, setOpened }) => {
  return (
    <div
      className="hamburger f-column y-end x-center"
      onClick={() => setOpened((prev) => !prev)}
      data-opened={opened}
    >
      <div></div>
      <div></div>
    </div>
  );
};

export default Hamburger;
