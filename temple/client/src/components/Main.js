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
  const arr = [];
  let history = useHistory();
  let enableClick = true;
  const duration = 250;

  const onWheel = useCallback(
    (e) => {
      console.log(e);
      e.preventDefault();
      const initialPosition = window.scrollY || window.pageYOffset;
      let parentItem = 0;
      let targetValue;
      const timer = () => (enableClick = true);
      for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("active");
      }
      if (e.deltaY < 0 && enableClick) {
        enableClick = false;
        let num = parentItem === 0 ? 0 : parentItem - 1;
        let target = arr[num];
        targetValue = target.offsetTop;
        target.classList.add("active");
        animateScroll({
          targetPosition: targetValue,
          initialPosition,
          duration,
        });
        history.push(`#${target.id}`);
        console.log(enableClick, "ss");
        setTimeout(timer, duration);
      }
      if (e.deltaY > 0 && enableClick) {
        enableClick = false;

        let num = parentItem === 0 ? parentItem + 1 : links.length - 1;
        let target = arr[num];
        targetValue = target.offsetTop;
        target.classList.add("active");
        animateScroll({
          targetPosition: targetValue,
          initialPosition,
          duration,
        });
        history.push(`#${target.id}`);
        console.log(enableClick, "ss");
        setTimeout(timer, duration);
      }
    },
    [enableClick]
  );

  useEffect(() => {
    // window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });
  }, [enableClick]);

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
