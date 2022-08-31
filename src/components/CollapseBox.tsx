import React, { createContext, useContext, useState } from "react";
import { Collapse } from "./Collapse";

interface ICollapseBoxContext {
    isOpened: boolean,
    setIsOpened: (value: boolean) => void
}

const CollapseBoxContext = createContext<ICollapseBoxContext>({
    isOpened: false,
    setIsOpened: () => {},
});

const _CollapseBoxBtn = ({children}:{children: React.ReactNode}) => {
    const {isOpened, setIsOpened} = useContext(CollapseBoxContext);

    return <button onClick={() => setIsOpened(!isOpened)} className="p-4 bg-slate-300" type="button">{children}</button>
}

const _CollapseBoxBody = ({children}:{children: React.ReactNode}) => {
    const {isOpened, setIsOpened} = useContext(CollapseBoxContext);

    return <Collapse isOpened={isOpened}>{children}</Collapse>
}

export const CollapseBox = ({children}:{children: React.ReactNode[]}) => {
    const [isOpened, setIsOpened] = useState(false);

    return <CollapseBoxContext.Provider value={{isOpened, setIsOpened}}>{children}</CollapseBoxContext.Provider>
}

CollapseBox.Control = _CollapseBoxBtn;
CollapseBox.Collapse = _CollapseBoxBody;