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
  const [isStopped, setIsStopped] = useState(true);
  const elRefs = useRef([]);
  const arr = [];
  let history = useHistory();

  const onWheel = useCallback(
    (e) => {
      if (isStopped) {
        setIsStopped(false);
        const initialPosition = window.scrollY;
        const duration = 250;
        let parentItem = 0;
        let targetValue;
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove("active");
        }
        if (e.deltaY < 0) {
          let target = arr[parentItem === 0 ? 0 : parentItem - 1];
          targetValue = target.offsetTop;
          history.push(`#${target.id}`);
          target.classList.add("active");
          console.log(target.indexOf, "up");
        }
        if (e.deltaY > 0) {
          let target =
            arr[parentItem === 0 ? parentItem + 1 : links.length - 1];
          history.push(`#${target.id}`);
          targetValue = target.offsetTop;
          target.classList.add("active");
          console.log(target.indexOf, "down");
        }
        if (targetValue === undefined) {
          setIsStopped(true);
          return;
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
  }, [isStopped]);

  return (
    <Fragment>
      <div className="container1">
        {links.map((el, index) => (
          <section id={el.text} key={el.id} ref={(el) => el && arr.push(el)}>
            {index === 0 ? <FirstPage /> : null}
            {index === 1 ? <SecondPage /> : null}
          </section>
        ))}
      </div>
    </Fragment>
  );
};

export default Main;
