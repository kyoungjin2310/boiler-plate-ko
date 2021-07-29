import React, { useEffect, Fragment, useCallback } from "react";
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

  const scrollAnimated = (target, initialPosition) => {
    let targetValue;
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove("active");
    }
    targetValue = target.offsetTop;
    target.classList.add("active");
    animateScroll({
      targetPosition: targetValue,
      initialPosition,
      duration,
    });
    history.push(`#${target.id}`);
    console.log(target, "target");
  };

  const onWheel = useCallback(
    (e) => {
      const initialPosition = window.scrollY || window.pageYOffset;
      console.log(e);
      e.preventDefault();
      let parentItem = 0;
      let num;
      const timer = () => (enableClick = true);
      if (e.deltaY < 0 && enableClick) {
        enableClick = false;
        setTimeout(timer, duration);
        num = parentItem === 0 ? 0 : parentItem - 1;
        let target = arr[num];
        scrollAnimated(target, initialPosition);
        console.log(enableClick, "e.deltaY < 0");
      }
      if (e.deltaY > 0 && enableClick) {
        setTimeout(timer, duration);
        num = parentItem + 1 >= links.length ? 0 : parentItem + 1;
        console.log(parentItem, "parentItem");
        let target = arr[num];
        if (num === undefined) {
          enableClick = false;
        }
        scrollAnimated(target, initialPosition);
        console.log(enableClick, "e.deltaY > 0");
      }
    },
    [enableClick]
  );

  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: false });
  }, [enableClick]);

  return (
    <Fragment>
      <div className="container1">
        {links.map((el, index) => (
          <section
            className="mainSection"
            id={el.text}
            key={el.id}
            ref={(el) => el && arr.push(el)}
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
