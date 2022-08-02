import React, { CSSProperties, FC, PropsWithChildren, ReactElement, ReactNode, useCallback } from "react";
import { CloseModalButton, CreateMenu } from "./styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu = ({ closeButton, style, show, children, onCloseModal }: PropsWithChildren<Props>) => {
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, [])
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={(e) => stopPropagation(e)}>menu</div>
      {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
      {children}
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
}

export default Menu;
