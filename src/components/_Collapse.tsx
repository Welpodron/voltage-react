import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react"
import { Animation } from "../hooks/utils/ultis"

const CollapseBoxBtn = ({isOpened, onClick}: {isOpened: boolean, onClick: React.MouseEventHandler}) => {
    return <button aria-expanded={isOpened} onClick={onClick} type="button">Collapse btn text</button>
}

const CollapseBoxBody = forwardRef(({setIsTranslating}:{setIsTranslating: Function}, ref: ForwardedRef<HTMLDivElement>) => {
    useEffect(() => {
        if (typeof ref === "function") return;

        if (!ref || !ref.current) return;

        // Performance strategy start
        const animation = new Animation({
            duration: 650, 
            from: {height: 0}, 
            to: {height: ref.current.scrollHeight},
            before: (state) => {
                (ref.current as HTMLDivElement).style.overflow = 'hidden';
                (ref.current as HTMLDivElement).style.height = 0 + 'px';
                // Warning remove transition!
                (ref.current as HTMLDivElement).style.transition = "height 0s";
            }, 
            step: (state) => {
                (ref.current as HTMLDivElement).style.height = state.props.height + 'px';
            }, 
            after: (state) => {
                (ref.current as HTMLDivElement).style.height = '';
                setIsTranslating(false);
            }
        });

        animation.start();
        // Performance strategy end
        // CSS strategy
        // ref.current.style.overflow = 'hidden';
        // ref.current.style.height = 0 + 'px';
        // ref.current.style.transition = "height 0.5s ease";
        // ref.current.style.height = ref.current.scrollHeight + 'px';
        // setTimeout(() => {
        //     (ref.current as HTMLDivElement).addEventListener('transitionend', () => {
        //         (ref.current as HTMLDivElement).style.height = '';
        //         setIsTranslating(false);
        //     }, {once: true})
        // }, parseFloat(window.getComputedStyle(ref.current).transitionDuration) * 1000)
        

        // return () => {
        //     setIsTranslating(false);
        // }
    }, [])

    return <div ref={ref}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores impedit distinctio dolorem? Porro consequatur tempore dolorem? Obcaecati sed consectetur eveniet. Assumenda similique quod impedit minus sed necessitatibus! Labore, sequi neque!
    Quaerat accusamus quia accusantium, alias voluptas ut maiores voluptatum sunt pariatur excepturi nisi molestiae ratione, nobis aliquam consectetur quo minus optio facilis, exercitationem quam! Optio dolores voluptatum odio repudiandae rerum!
    Similique mollitia sed quaerat architecto ut quo aperiam quod dolorum aliquam, quia ipsum necessitatibus quidem reiciendis nam deleniti fugit, modi sapiente exercitationem dicta! In voluptas suscipit eum, officia aut quos!</div>
})

export const CollapseBox = forwardRef((props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    const contrainerRef = useRef<HTMLDivElement | null>(null);

    const open = () => {
        setIsOpened(true);
    }

    const close = () => {
        if (!contrainerRef.current) {
            return;
        }

        // Performance strategy start
        const animation = new Animation({
            duration: 650, 
            from: {height: contrainerRef.current.scrollHeight}, 
            to: {height: 0},
            before: (state) => {
                // Warning remove transition!
                (contrainerRef.current as HTMLDivElement).style.transition = "height 0s";
                // (contrainerRef.current as HTMLDivElement).style.overflow = 'hidden';
                (contrainerRef.current as HTMLDivElement).style.height = state.props.height + 'px';
            }, 
            step: (state) => {
                (contrainerRef.current as HTMLDivElement).style.height = state.props.height + 'px';
            }, 
            after: (state) => {
                (contrainerRef.current as HTMLDivElement).style.display = 'none';
                setIsOpened(false);
                setIsTranslating(false);
            }
        });

        animation.start();
        // Performance strategy end
        // CSS strategy
        // contrainerRef.current.style.height = contrainerRef.current.scrollHeight + 'px';
        // contrainerRef.current.scrollHeight
        // contrainerRef.current.style.height = 0 + 'px';
        // setTimeout(() => {
        //     (contrainerRef.current as HTMLDivElement).addEventListener('transitionend', () => {
        //         (contrainerRef.current as HTMLDivElement).style.height = '';
        //         (contrainerRef.current as HTMLDivElement).style.display = 'none';
        //         setIsOpened(false);
        //         setIsTranslating(false);
        //     }, {once: true})
        // }, parseFloat(window.getComputedStyle(contrainerRef.current).transitionDuration) * 1000)
    }

    const toogle = () => {
        isOpened ? close() : open();
    }

    const handleClick = (evt: React.MouseEvent) => {
        if (isTranslating) return;

        setIsTranslating(true);

        toogle();
    };

    return <div ref={ref}>
        <CollapseBoxBtn isOpened={isOpened} onClick={handleClick}></CollapseBoxBtn>
        {isOpened && <CollapseBoxBody setIsTranslating={setIsTranslating} ref={contrainerRef}></CollapseBoxBody>}   
    </div>
})