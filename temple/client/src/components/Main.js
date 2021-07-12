import React, { useEffect, useState, Fragment, useRef } from "react";
// import { Pagination, PageItem } from "react-bootstrap";
//import ReactPageScroller from "react-page-scroller";
import FirstPage from "./comments/main/FirstPage";
import SecondPage from "./comments/main/SecondPage";
import { animated, useSpring } from "react-spring";

const Main = () => {
  const scrollDestinationRef = useRef();
  return (
    <Fragment>
      <div className="container1">
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
