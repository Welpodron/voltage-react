import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  useRef,
  createRef,
} from "react";

import { Animation as _Animation } from "../utils/ultis";

import { useMergedRef } from "../hooks/use-merged-ref";

export const Animation = ({
  children,
  duration,
  from,
  to,
  before,
  after,
}: {
  children: React.ReactElement;
  duration: number;
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  before?: () => void;
  after?: () => void;
}) => {
  if (children.type === React.Fragment) {
    throw new Error("Animation cannot accept React.Fragment");
  }

  const elementRef = useRef<HTMLElement>();

  const child = React.cloneElement(React.Children.only(children), {
    ref: useMergedRef(elementRef, (children as any).ref),
  });

  useEffect(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;

    const animation = new _Animation({
      duration,
      from,
      to,
      step: (state) => {
        Object.entries(state.props).forEach((state) => {
          const [cssProperty, cssPropertyValue] = state;
          el.style.setProperty(cssProperty, cssPropertyValue.toString());
        });
      },
    });

    animation.start();
  }, [elementRef]);

  return <>{child}</>;
};
