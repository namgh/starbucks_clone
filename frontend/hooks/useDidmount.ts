import { useRef, useEffect } from "react";

export const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

// 첫 번째 렌더링을 막고 dependency에만 변경되도록
