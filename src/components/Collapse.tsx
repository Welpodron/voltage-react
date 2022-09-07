import { forwardRef, ReactNode } from "react";

export interface ICollapseProps {
  children: ReactNode;
  isOpened: boolean;
}

export const Collapse = forwardRef<HTMLDivElement, ICollapseProps>(
  ({ children, isOpened }, ref) => {
    return (
      <div
        style={{ display: isOpened ? "block" : "none" }}
        className="bg-red-100 overflow-hidden"
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
