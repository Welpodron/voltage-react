import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const _ModalBody = ({
  children,
  isOpened,
  setIsOpened,
}: {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}) => {
  const firstFocusableElement = useRef<HTMLButtonElement>(null);
  const lastFocusableElement = useRef<HTMLButtonElement>(null);

  const handleDocumentKeydown = (evt: KeyboardEvent) => {
    if (evt.code === "Escape") {
      return setIsOpened(false);
    }

    if (evt.code === "Tab") {
      if (!evt.target) return;

      if (evt.shiftKey) {
        if (firstFocusableElement.current?.contains(evt.target as Node)) {
          evt.preventDefault();
          lastFocusableElement.current?.focus();
        }

        return;
      }

      if (lastFocusableElement.current?.contains(evt.target as Node)) {
        evt.preventDefault();
        return firstFocusableElement.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (!firstFocusableElement.current && !lastFocusableElement.current) return;

    firstFocusableElement.current?.focus();

    document.addEventListener("keydown", handleDocumentKeydown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleDocumentKeydown);
      document.body.style.overflow = "";
    };
  }, [firstFocusableElement, lastFocusableElement]);

  return (
    <div className="fixed inset-0 min-w-full min-h-full bg-red-300 p-4">
      <div>
        {/* Focus trap first element start */}
        <button ref={firstFocusableElement} type="button" aria-hidden="true">
          First
        </button>
        {/* Focus trap first element end */}
        <button onClick={() => setIsOpened(false)} type="button">
          Close modal
        </button>
        <button onClick={() => setIsOpened(false)} type="button">
          Close modal
        </button>
        <button onClick={() => setIsOpened(false)} type="button">
          Close modal
        </button>
        {children}
        {/* Focus trap last element start */}
        <button ref={lastFocusableElement} type="button" aria-hidden="true">
          Last
        </button>
        {/* Focus trap last element end */}
      </div>
    </div>
  );
};

export const Modal = ({
  children,
  isOpened,
  setIsOpened,
}: {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}) => {
  return (
    <>
      {isOpened &&
        createPortal(
          <_ModalBody setIsOpened={setIsOpened} isOpened={isOpened}>
            {children}
          </_ModalBody>,
          document.body
        )}
    </>
  );
};
