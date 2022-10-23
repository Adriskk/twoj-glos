import React, { FC } from "react";

interface DefaultHeaderProps {
  text: string;
}

const DefaultHeader: FC<DefaultHeaderProps> = ({ text }) => {
  return <header className="default-header">{text}</header>;
};

export default DefaultHeader;
