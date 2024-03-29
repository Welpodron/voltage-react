import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";

import { useId } from "../hooks/use-id";

import { createPortal } from "react-dom";
import { throttle } from "../utils/ultis";

interface IPopoverContext {
  controlRef: React.RefObject<HTMLButtonElement> | null;
  bodyRef: React.RefObject<HTMLDialogElement> | null;
  isOpened: boolean;
  isMenu?: boolean;
  setIsOpened: (value: boolean) => void;
}

const PopoverContext = createContext<IPopoverContext>({
  controlRef: null,
  bodyRef: null,
  isOpened: false,
  isMenu: false,
  setIsOpened: (value) => {},
});

interface IPopoverTreeContext {
  children: React.MutableRefObject<{ id: string; parentId: string | null }[]>;
  addChild: ({ id, parentId }: { id: string; parentId: string | null }) => void;
  removeChild: ({
    id,
    parentId,
  }: {
    id: string;
    parentId: string | null;
  }) => void;
}

const PopoverTreeContext = createContext<IPopoverTreeContext | null>(null);

const PopoverControl = ({ children }: { children: ReactNode }) => {
  const { isOpened, setIsOpened, controlRef, bodyRef } =
    useContext(PopoverContext);

  const handleControlClick = (evt: React.MouseEvent) => {
    setIsOpened(true);
  };

  return (
    <button
      onClick={handleControlClick}
      ref={controlRef}
      className="bg-red-300 p-3"
      type="button"
    >
      {children}
    </button>
  );
};

const PopoverDialog = ({ children }: { children: ReactNode }) => {
  const firstFocusableElement = useRef<HTMLDivElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const { isOpened, setIsOpened, controlRef, bodyRef, isMenu } =
    useContext(PopoverContext);

  //TODO: Add use callback + Maybe add check for currentRefs ????
  const calculatePosition = () => {
    const bodyEl = bodyRef?.current as HTMLDialogElement;
    const anchorEl = controlRef?.current as HTMLButtonElement;

    const {
      width: anchorWidth,
      height: anchorHeight,
      left: anchorLeft,
      top: anchorTop,
    } = anchorEl.getBoundingClientRect();

    let x = anchorLeft + window.scrollX;
    let y = anchorTop + window.scrollY;

    bodyEl.style.left = x + "px";
    bodyEl.style.top = y + anchorHeight + "px";

    bodyEl.show();

    const {
      width: bodyWidth,
      height: bodyHeight,
      left: bodyLeft,
      top: bodyTop,
    } = bodyEl.getBoundingClientRect();

    x = bodyLeft + window.scrollX;
    y = bodyTop + window.scrollY;

    if (Math.ceil(x + bodyWidth) >= window.innerWidth) {
      bodyEl.style.left = x - bodyWidth + anchorWidth + "px";
    }

    if (Math.ceil(y + bodyHeight + anchorHeight) >= window.innerHeight) {
      bodyEl.style.top = y - bodyHeight - anchorHeight + "px";
    }
  };

  //TODO: Add use callback
  const handleWindowResize = (evt: Event) => {
    calculatePosition();
  };

  const throttledHandleWindowResize = throttle(handleWindowResize, 100);

  //TODO: Add use callback + Maybe remove checks for currentRefs ? Because useEffect checks it?
  const handleDocumentMouseDown = (evt: MouseEvent) => {
    if (
      (controlRef?.current as HTMLElement).contains(evt.target as HTMLElement)
    ) {
      return;
    }

    if (firstFocusableElement?.current === evt.target) {
      return;
    }

    if (isMenu) {
      return setIsOpened(false);
    }

    if (
      !(bodyRef?.current as HTMLElement).contains(evt.target as HTMLElement)
    ) {
      return setIsOpened(false);
    }
  };
  //   TODO: Maybe add check for currentRefs ????
  const handleDocumentKeydown = (evt: KeyboardEvent) => {
    if (evt.code === "Tab") {
      if (evt.shiftKey) {
        if (evt.target === firstFocusableElement.current) {
          evt.preventDefault();
          return firstFocusableElement.current?.focus();
        }
        return;
      }

      if (evt.target === lastFocusableElement.current) {
        evt.preventDefault();
        return firstFocusableElement.current?.focus();
      }
      return;
    }

    if (evt.code === "Escape") {
      evt.preventDefault();
      return setIsOpened(false);
    }

    if (evt.code === "Enter") {
      if (isMenu) {
        if (document.activeElement === firstFocusableElement.current) {
          evt.preventDefault();
          return setIsOpened(false);
        }
      }
    }

    if (evt.code === "Space") {
      if (isMenu) {
        if (document.activeElement === firstFocusableElement.current) {
          evt.preventDefault();
          return setIsOpened(false);
        }
      }
    }
  };
  //   TODO: Maybe add check for currentRefs ????
  const handleDocumentClick = (evt: MouseEvent) => {
    if (!evt.target) return;

    if (
      (controlRef?.current as HTMLElement).contains(evt.target as HTMLElement)
    ) {
      return;
    }

    if (firstFocusableElement?.current === evt.target) {
      return;
    }

    if (isMenu) {
      return setIsOpened(false);
    }

    if (
      !(bodyRef?.current as HTMLElement).contains(evt.target as HTMLElement)
    ) {
      return setIsOpened(false);
    }
  };

  const handleLastElementFocus = (evt: FocusEvent) => {
    evt.preventDefault();
    return firstFocusableElement.current?.focus();
  };

  useEffect(() => {
    if (!controlRef?.current && !bodyRef?.current) return;

    if (!isOpened) return;

    firstFocusableElement.current?.focus();

    lastFocusableElement.current?.removeEventListener(
      "focus",
      handleLastElementFocus
    );
    lastFocusableElement.current?.addEventListener(
      "focus",
      handleLastElementFocus
    );

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);
    window.addEventListener("resize", throttledHandleWindowResize);

    calculatePosition();

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleDocumentKeydown);
      window.removeEventListener("resize", throttledHandleWindowResize);
      controlRef?.current?.focus();
    };
  }, [controlRef, bodyRef, isOpened, setIsOpened]);

  return (
    <dialog
      ref={bodyRef}
      className="p-0 bg-red-200 absolute flex-shrink-0 m-0 max-w-xs w-80"
    >
      <div
        ref={firstFocusableElement}
        tabIndex={0}
        className="p-2 w-full h-full max-h-80 overflow-y-auto"
      >
        {children}
      </div>
      {/* Focus trap last element start */}
      <button
        ref={lastFocusableElement}
        type="button"
        className="sr-only"
        aria-hidden="true"
      ></button>
      {/* Focus trap last element end */}
    </dialog>
  );
};

const PopoverBody = ({ children }: { children: ReactNode }) => {
  const { isOpened, setIsOpened, controlRef, bodyRef } =
    useContext(PopoverContext);

  return (
    <>
      {isOpened &&
        createPortal(<PopoverDialog>{children}</PopoverDialog>, document.body)}
    </>
  );
};

export const Popover = ({
  children,
  isMenu,
}: {
  children: ReactNode[];
  isMenu?: boolean;
}) => {
  // const id = useId();
  // const tree = useContext(PopoverTreeContext);

  // useLayoutEffect(() => {
  //   if (!tree || !id) return;

  //   tree.addChild({ id, parentId: null });

  //   return () => {
  //     tree.removeChild({ id, parentId: null });
  //   };
  // }, [tree, id]);

  // console

  const [isOpened, setIsOpened] = useState<boolean>(false);

  // parentId
  // children
  // addChild
  // removeChild

  const controlRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDialogElement>(null);

  return (
    <PopoverContext.Provider
      value={{ isOpened, setIsOpened, controlRef, bodyRef, isMenu }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

interface IPopoverTreeProps {
  children: React.ReactNode;
}

export const PopoverTree = ({ children }: IPopoverTreeProps) => {
  const tree = useRef<{ id: string; parentId: string | null }[]>([]);

  const addChild = useCallback(
    ({ id, parentId }: { id: string; parentId: string | null }) => {
      tree.current = [...tree.current, { id, parentId }];
    },
    []
  );
  const removeChild = useCallback(
    ({ id, parentId }: { id: string; parentId: string | null }) => {
      tree.current = tree.current.filter(
        (branch) => branch.id !== id && branch.parentId !== parentId
      );
    },
    []
  );

  return (
    <PopoverTreeContext.Provider
      value={{ children: tree, addChild, removeChild }}
    >
      {children}
    </PopoverTreeContext.Provider>
  );
};

Popover.Control = PopoverControl;
Popover.Body = PopoverBody;
