import React, { useState, createContext, useContext, useEffect} from "react"

import { Collapse } from "./Collapse"

interface IAccordionContext {
    value: string[];
    setValue: (value: string[]) => void;
}

const AccordionContext = createContext<IAccordionContext>({
    value: [],
    setValue: (value: string[]) => {}
});

interface IAccordionItemContext {
    value: string
}

const AccordionItemContext = createContext<IAccordionItemContext>({
    value: '',
})

const _AccordionItemControl = ({children}: {children: React.ReactNode}) => {
    const {value: accordionValue, setValue: setAccordionValue} = useContext(AccordionContext);
    const {value: itemValue} = useContext(AccordionItemContext);

    const handleClick = (evt: React.MouseEvent) => {
        setAccordionValue([itemValue]);
    }

    return <button onClick={handleClick} className="p-4 bg-slate-300" type="button">{children}</button>
}

const _AccordionItemCollapse = ({children}: {children: React.ReactNode}) => {
    const {value: accordionValue, setValue: setAccordionValue} = useContext(AccordionContext);
    const {value: itemValue} = useContext(AccordionItemContext);

    return <Collapse isOpened={accordionValue[0] === itemValue}>{children}</Collapse>
}

const _AccordionItem = ({children, value: itemValue}: {children: React.ReactNode[], value: string}) => {
    const [value, setValue] = useState<string>(itemValue);

    const {value: accordionValue, setValue: setAccordionValue} = useContext(AccordionContext);

    return <AccordionItemContext.Provider value={{value}}>{children}</AccordionItemContext.Provider>
}  

_AccordionItem.Control = _AccordionItemControl;
_AccordionItem.Collapse = _AccordionItemCollapse;

export const Accordion = ({children} : {children: React.ReactNode[]}) => {
    const [value, setValue] = useState<string[]>([]);

    return <AccordionContext.Provider value={{value, setValue}}>{children}</AccordionContext.Provider>
}

Accordion.Item = _AccordionItem;