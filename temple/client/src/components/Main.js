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

  const onWheel = useCallback(
    (e) => {
      if (isStopped) {
        setIsStopped(false);
        const initialPosition = window.scrollY;
        const duration = 100;
        let parentItem = 0;
        let targetValue;
        if (e.deltaY < 0) {
          targetValue = arr[parentItem === 0 ? 0 : parentItem - 1];
          console.log(targetValue, "up");
          if (targetValue === undefined) {
            setIsStopped(true);
            return;
          }
        }
        if (e.deltaY > 0) {
          targetValue = arr[parentItem + 1];
          console.log(targetValue, "down");
          if (targetValue === undefined) {
            setIsStopped(true);
            return;
          }
        }
        animateScroll({
          targetPosition: targetValue,
          initialPosition,
          duration,
        });
      }
    },
    [isStopped]
  );

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
  });

  return (
    <Fragment>
      <div className="container1">
        {links.map((el, index) => (
          <section
            className={
              index - 1 === currentWheel ? "section active" : "section"
            }
            id={el.text}
            key={el.id}
            ref={(el) => el && arr.push(el.offsetTop)}
          >
            {index === 0 ? <FirstPage /> : null}
            {index === 1 ? <SecondPage /> : null}
          </section>
        ))}
      </div>
    </Fragment>
  );
};

export default Main;
