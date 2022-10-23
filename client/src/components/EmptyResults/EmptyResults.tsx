import React, { FC } from "react";

interface EmptyResultsProps {
  text: string;
}

const EmptyResults: FC<EmptyResultsProps> = ({ text }) => {
  return <span className="empty-results fle y-center x-center">{text}</span>;
};

export default EmptyResults;
