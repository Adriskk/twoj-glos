import React, { FC, useState } from "react";
import ReactDOM from "react-dom";

interface PopupProps {
  title: string;
  message: string;
}

const Popup: FC<PopupProps> = ({ title, message }) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const element = document.getElementById("portal");
  if (!element || !isOpened) return <></>;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={() => setIsOpened(false)}></div>
      <div className="popup f-column y-start x-start">
        <span className="popup-title">{title}</span>
        <p className="popup-message">{message}</p>
      </div>
    </>,
    element
  );
};

export default Popup;
