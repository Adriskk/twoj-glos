import React, { FC } from "react";

interface TagProps {
  text: string;
}

const Tag: FC<TagProps> = ({ text }) => {
  return <span className="tag">{text}</span>;
};

export default Tag;
