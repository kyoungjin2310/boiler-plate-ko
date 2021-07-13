import React, { useEffect, useState, Fragment, useRef } from "react";
// import { Pagination, PageItem } from "react-bootstrap";
//import ReactPageScroller from "react-page-scroller";
import FirstPage from "./comments/main/FirstPage";
import SecondPage from "./comments/main/SecondPage";
import { animated, useSpring } from "react-spring";

const Main = () => {
  const [y, setY] = useSpring(() => ({ y: 0 }));
  const scrollDestinationRef = useRef("");
  let isStopped = false;

  const onWheel = (e) => {
    const el = scrollDestinationRef.current.children;
    isStopped = true;
    const arr = Array.prototype.slice.call(el);
    const result = arr.filter((item) => !item.className.indexOf("on"));
    console.log(result);
    if (isStopped) {
      isStopped = false;
      if (e.deltaY < 0) {
        const value = scrollDestinationRef.current.children[0].offsetTop;
        console.log("up");
        setY({
          reset: true,
          from: { y: window.scrollY },
          to: { y: window.scrollTo(0, value) },
          onRest: () => {
            isStopped = false;
          },
          onFrame: (props) => {
            if (!isStopped) {
              window.scroll(0, props.y);
            }
          },
        });
      }
      if (e.deltaY > 0) {
        const value = scrollDestinationRef.current.children[1].offsetTop;
        console.log("down");
        setY({
          reset: true,
          from: { y: window.scrollY },
          to: { y: window.scrollTo(0, value) },
          onRest: () => {
            isStopped = false;
          },
          onFrame: (props) => {
            if (!isStopped) {
              window.scroll(0, props.y);
            }
          },
        });
        isStopped = false;
      }
    }
  };

  const scrollToTarget = () => {
    const element = scrollDestinationRef.current;
    const value = window.scrollY + element.getBoundingClientRect().top;

    window.addEventListener("wheel", onWheel);

    setY({
      y: value,
      reset: true,
      from: { y: window.scrollY },
      onRest: () => {
        isStopped = false;
        window.removeEventListener("wheel", onWheel);
      },
      onFrame: (props) => {
        if (!isStopped) {
          window.scroll(0, props.y);
        }
      },
    });
  };

  return (
    <Fragment>
      <div
        className="container1"
        ref={scrollDestinationRef}
        onWheel={scrollToTarget}
      >
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
