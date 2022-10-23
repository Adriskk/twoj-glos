import React, { FC, ReactElement } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactElement;
  title: string;
  message: string;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({
  children,
  title,
  message,
  isOpened,
  setIsOpened,
}) => {
  const element = document.getElementById("portal");
  if (!element || !isOpened) return <></>;

  return ReactDOM.createPortal(
    <>
      <div className="overlay" onClick={() => setIsOpened(false)}></div>
      <div className="modal f-column y-start x-start">
        <div className="modal-top-bar flex y-center x-start">
          <span className="title">{title}</span>
        </div>

        <div className="modal-body f-column y-start x-between">
          <p className="message">{message}</p>
          {children}
        </div>
      </div>
    </>,
    element
  );
};

export default Modal;
