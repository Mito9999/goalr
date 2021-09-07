import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div
      className="font-inter absolute top-0 left-0 w-full h-full flex justify-center items-center"
      style={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white max-w-lg rounded-2xl p-8">
        <div
          className={`flex ${
            title ? "justify-between" : "justify-end"
          } text-2xl align-center`}
        >
          {title && <div className="4xl font-semibold">{title}</div>}
          <MdClose className="cursor-pointer" onClick={handleCloseClick} />
        </div>
        <div className="pt-2.5">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
