import React, { createContext, useContext, useState } from "react";

import { Collapse } from "./Collapse";

interface ICollapseBoxContext {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}

interface I_CollapseBoxBodyProps {
  children: React.ReactNode;
}

export interface ICollapseBoxProps {
  children: React.ReactNode[];
}

const CollapseBoxContext = createContext<ICollapseBoxContext>({
  isOpened: false,
  setIsOpened: () => {},
});

interface I_CollapseBoxControlProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "type"> {
  children: React.ReactNode;
  className?: string;
}

const defaultCollapseBoxControlProps: Partial<I_CollapseBoxControlProps> = {
  className: "p-4 bg-slate-300",
};

const _CollapseBoxControl = (props: I_CollapseBoxControlProps) => {
  const { children, className, ...others } = {
    ...defaultCollapseBoxControlProps,
    ...props,
  };

  const { isOpened, setIsOpened } = useContext(CollapseBoxContext);

  return (
    <button
      onClick={() => setIsOpened(!isOpened)}
      className={className}
      type="button"
      {...others}
    >
      {children}
    </button>
  );
};

const _CollapseBoxBody = ({ children }: I_CollapseBoxBodyProps) => {
  const { isOpened } = useContext(CollapseBoxContext);

  return <Collapse isOpened={isOpened}>{children}</Collapse>;
};

export const CollapseBox = ({ children }: ICollapseBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CollapseBoxContext.Provider value={{ isOpened, setIsOpened }}>
      {children}
    </CollapseBoxContext.Provider>
  );
};

CollapseBox.Control = _CollapseBoxControl;
CollapseBox.Collapse = _CollapseBoxBody;
