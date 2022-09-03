import React, { createContext, useContext, useState } from "react";

import { Collapse } from "./Collapse";

// import { Animation } from "./Animation";
// import { Transition } from "react-transition-group";

// const duration = 1000;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// };

// const transitionStyles: Record<string, any> = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 0 },
//   exited: { opacity: 0 },
// };

interface ICollapseBoxContext {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}

const CollapseBoxContext = createContext<ICollapseBoxContext>({
  isOpened: false,
  setIsOpened: () => {},
});

const _CollapseBoxBtn = ({ children }: { children: React.ReactNode }) => {
  const { isOpened, setIsOpened } = useContext(CollapseBoxContext);

  return (
    <button
      onClick={() => setIsOpened(!isOpened)}
      className="p-4 bg-slate-300"
      type="button"
    >
      {children}
    </button>
  );
};

const _CollapseBoxBody = ({ children }: { children: React.ReactNode }) => {
  const { isOpened, setIsOpened } = useContext(CollapseBoxContext);

  return <Collapse isOpened={isOpened}>{children}</Collapse>;
};

export const CollapseBox = ({ children }: { children: React.ReactNode[] }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <CollapseBoxContext.Provider value={{ isOpened, setIsOpened }}>
      {children}
    </CollapseBoxContext.Provider>
  );
};

CollapseBox.Control = _CollapseBoxBtn;
CollapseBox.Collapse = _CollapseBoxBody;
