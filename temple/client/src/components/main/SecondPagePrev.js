import { useEffect, useRef } from "react";

const SecondPagePrev = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default SecondPagePrev;
