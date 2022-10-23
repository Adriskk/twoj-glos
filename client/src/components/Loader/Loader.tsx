import React, { FC } from "react";

interface LoaderProps {
  size: "small" | "big";
}

const Loader: FC<LoaderProps> = ({ size }) => {
  return (
    <div className="loader flex y-center x-center" data-size={size}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
