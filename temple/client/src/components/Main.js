import React, { useEffect, useState, Fragment, useRef } from "react";
// import { Pagination, PageItem } from "react-bootstrap";
//import ReactPageScroller from "react-page-scroller";
import FirstPage from "./comments/main/FirstPage";
import SecondPage from "./comments/main/SecondPage";
import { animated, useSpring } from "react-spring";

const Main = () => {
  const scrollDestinationRef = useRef();
  const [y, setY] = useSpring(() => ({
    immediate: false,
    y: 0,
    onFrame: (props) => {
      window.scroll(0, props.y);
    },
    config: config.slow,
  }));
  return (
    <Fragment>
      <div
        className="container1"
        ref={scrollDestinationRef}
        onClick={() => {
          setY({ y: scrollDestinationRef.current.getBoundingClientRect().top });
        }}
      >
        <section className="one section" id="home">
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
