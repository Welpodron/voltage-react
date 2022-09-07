import React, { useCallback } from "react";

export const useMergedRef = <T,>(...refs: React.ForwardedRef<T>[]) => {
  const mergedRef = useCallback((node: T | null) => {
    refs.forEach((ref) => {
      if (ref == null) {
        return;
      }

      if (typeof ref === "function") {
        return ref(node);
      }

      if (typeof ref === "object" && "current" in ref) {
        return (ref.current = node);
      }
    });
  }, refs);

  return mergedRef;
};
