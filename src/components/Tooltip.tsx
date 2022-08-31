import React, {createRef, useEffect, useState } from "react"
import ReactDOM from "react-dom";

const _Tooltip = ({text, anchorRef}: {text: string, anchorRef: React.RefObject<HTMLElement>}) => {
    const elementRef = createRef<HTMLSpanElement>();

    useEffect(() => {
        if (!elementRef.current) return;
        if (!anchorRef.current) return;
        const {width: anchorWidth, height: anchorHeight, left: anchorLeft, top: anchorTop} = anchorRef.current.getBoundingClientRect();

        const x = anchorLeft + window.scrollX;
        const y = anchorTop + window.scrollY;

        elementRef.current.style.left = x + 'px';
        elementRef.current.style.top = y + anchorHeight + 'px';
        elementRef.current.style.opacity = '1';

        const {width: elementWidth, height: elementHeight, left: elementLeft, top: elementTop} = elementRef.current.getBoundingClientRect();
    }, [elementRef, anchorRef])

    return <span ref={elementRef} className="bg-black text-white p-3 absolute left-0 top-0 opacity-0 pointer-events-none">{text}</span>
}

export const Tooltip = ({text, children}: {text: string, children: React.ReactElement}) => {
    if (children.type === React.Fragment) {
        throw new Error("Tooltip cannot accept React.Fragment");
    }

    const [isHovering, setIsHovering] = useState(false);

    const elementRef = createRef<HTMLElement>();

    const child = React.cloneElement(React.Children.only(children), {
        ref: elementRef
    });

    useEffect(() => {
        if (!elementRef.current) return;

        elementRef.current.addEventListener('mouseenter', () => {
            setIsHovering(true);
        });

        elementRef.current.addEventListener('mouseleave', () => {
            setIsHovering(false);
        })
    }, [elementRef])

    return <>
    {child}
    {isHovering && ReactDOM.createPortal(<_Tooltip anchorRef={elementRef} text={text} />,document.body)}
    </>
}