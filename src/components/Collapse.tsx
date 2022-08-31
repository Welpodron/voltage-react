import React, { ReactNode, useEffect } from "react"

export const Collapse = ({ children, isOpened = false } : { isOpened?: boolean, children: ReactNode }) => {
    return <>{isOpened && <div>{children}</div>}</>
}