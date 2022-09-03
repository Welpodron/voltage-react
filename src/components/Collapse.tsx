import { ReactNode, useEffect, useRef } from "react";

export const Collapse = ({
  children,
  style,
  isOpened = false,
}: {
  isOpened?: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  const renderCounter = useRef(0);

  renderCounter.current = renderCounter.current + 1;

  return (
    <div style={{ display: isOpened ? "block" : "none" }}>
      Renders: {renderCounter.current} {children}
    </div>
  );
};
