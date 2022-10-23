import React, { FC } from "react";

// * Resources.
import { ReactComponent as LogoIcon } from "../../assets/svg/logo.svg";

const Logo: FC = () => {
  return (
    <a className="logo flex y-center x-center" href="/">
      <LogoIcon className="icon" />
      <span>
        <span>Twój</span> głos
      </span>
    </a>
  );
};

export default Logo;
