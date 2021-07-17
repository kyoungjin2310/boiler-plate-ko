import React, { useEffect, useState, Fragment, useRef } from "react";
// import { Pagination, PageItem } from "react-bootstrap";
//import ReactPageScroller from "react-page-scroller";
import FirstPage from "./main/FirstPage";
import SecondPage from "./main/SecondPage";
import { animateScroll } from "./main/animationScroll";
import { useHistory } from "react-router-dom";

const Main = () => {
  const scrollDestinationRef = useRef("");
  let isStopped = true;

  const onWheel = (e) => {
    const el = scrollDestinationRef.current.children;
    isStopped = true;
    const arr = Array.prototype.slice.call(el);
    const result = arr.filter((item) => !item.className.indexOf("on"));
    if (isStopped) {
      let targetValue;
      let i = arr.indexOf(arr[0]);
      console.log(i, "i");

      if (e.deltaY < 0) {
        const initialPosition = window.scrollY;
        const duration = 200;
        targetValue = scrollDestinationRef.current.children[0];
        console.log(scrollDestinationRef.current.children[0], "up");
        if (targetValue === undefined) {
          return;
        }
        arr[0].classList.add("on");
        animateScroll({
          targetPosition: targetValue.offsetTop,
          initialPosition,
          duration,
        });
      }
      if (e.deltaY > 0) {
        const initialPosition = window.scrollY;
        const duration = 200;
        targetValue = scrollDestinationRef.current.children[1];
        console.log(scrollDestinationRef.current.children[1], "down");
        if (targetValue === undefined) {
          return;
        }
        animateScroll({
          targetPosition: targetValue.offsetTop,
          initialPosition,
          duration,
        });
      }
      isStopped = false;
    }
  };

  window.addEventListener("wheel", onWheel);

  return (
    <Fragment>
      <div className="container1" ref={scrollDestinationRef}>
        <section className="one section on" id="home">
          <FirstPage />
        </section>
        <section className="two section" id="portfolio">
          <SecondPage />
        </section>
      </div>
    </Fragment>
  );
};

export default Main;
