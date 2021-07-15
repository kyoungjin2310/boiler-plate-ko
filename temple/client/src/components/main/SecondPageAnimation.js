import SecondPagePrev from "./SecondPagePrev";
import { useTransition } from "react-spring";

const SecondPageAnimation = (items, key) => {
  const prev = SecondPagePrev(key);

  let direction;

  if (prev === undefined || prev === key) {
    direction = 0;
  } else {
    direction = prev > key ? -1 : 1;
  }

  const styles = {
    from: {
      opacity: direction === 0 ? 1 : 0,
      transform: `translate3d(${100 * direction}%, 0, 0)`,
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0, 0, 0)`,
    },
    leave: {
      opacity: 0,
      transform: `translate3d(${-100 * direction}%, 0, 0)`,
      position: "absolute",
      left: 0,
      right: 0,
    },
  };

  const trnasitions = useTransition(items, key, styles);

  return trnasitions;
};

export default SecondPageAnimation;
