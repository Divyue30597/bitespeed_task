// https://www.letsbuildui.dev/articles/how-to-animate-mounting-content-in-react/
import { useEffect, useState } from "react";

export const useMountTransition = (
  isMounted: boolean,
  unmountDelay: number
) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: number;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
};