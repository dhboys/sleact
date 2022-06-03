import React, { FC, ReactElement, ReactNode } from "react";
import { CreateMenu } from "./styles";

interface MemuProps {
  children: React.ReactNode;
}

const Menu: FC<MemuProps> = ({ children }) => {
  return (
    <CreateMenu>
      <div>menu</div>
      {children}
    </CreateMenu>
  );
};

export default Menu;
