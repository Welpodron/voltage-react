import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";

import { Animation as _Animation } from "../utils/ultis";

export const Animation = ({
  children,
  mounted,
  duration,
  from,
  to,
  before,
  after,
}: {
  children: (styles: React.CSSProperties) => ReactElement;
  mounted: boolean;
  duration: number;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  before?: () => void;
  after?: () => void;
}) => {
  const [styles, setStyles] = useState<Record<string, string | number>>({});

  const renderCounter = useRef(0);

  renderCounter.current = renderCounter.current + 1;

  useEffect(() => {
    console.log("animation component rerenders");

    const animation = new _Animation({
      duration,
      from,
      to,
      step: (state) => {
        setStyles({ ...state.props });
      },
    });

    // animation.start();
  }, []);

  return (
    <div>
      Renders: {renderCounter.current} {children(styles)}
    </div>
  );
};
