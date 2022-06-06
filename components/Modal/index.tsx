import React, { FC, ReactElement, ReactNode } from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div>
      <div>modal</div>
      {children}
    </div>
  );
};

export default Modal;
