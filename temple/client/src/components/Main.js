import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
// import { Pagination, PageItem } from "react-bootstrap";
//import ReactPageScroller from "react-page-scroller";
import FirstPage from "./main/FirstPage";
import SecondPage from "./main/SecondPage";
import { animateScroll } from "./main/animationScroll";
import { useHistory } from "react-router-dom";
import { links } from "./main/data";

const Main = () => {
  const [currentWheel, setCurrentWheel] = useState(0);
  const [isStopped, setIsStopped] = useState(true);
  const elRefs = useRef([]);
  const arr = [];
  const totalWheel = links.length;

  const onWheel = (e) => {
    const initialPosition = window.scrollY;
    const duration = 100;
    if (isStopped) {
      e.deltaY < 0
        ? setCurrentWheel(currentWheel > 0 ? currentWheel - 1 : null)
        : setCurrentWheel(
            currentWheel + 1 > links.length ? null : currentWheel + 1
          );
      let targetValue = arr[currentWheel];
      console.log(currentWheel, "up down");
      animateScroll({
        targetPosition: targetValue,
        initialPosition,
        duration,
      });
      setIsStopped(false);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
  });

  return (
    <Fragment>
      <div className="container1">
        {links.map((el, index) => (
          <section
            className={index === currentWheel ? "section active" : "section"}
            id={el.text}
            key={el.id}
            ref={(el) => el && arr.push(el.offsetTop)}
          >
            {index === 0 ? <FirstPage /> : null}
            {index === 1 ? <SecondPage /> : null}
            {console.log(arr, "elRefs")}
          </section>
        ))}
      </div>
    </Fragment>
  );
};

export default Main;
