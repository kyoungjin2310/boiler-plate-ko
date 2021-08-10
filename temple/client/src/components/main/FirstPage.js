import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import blobs from "blobs";

const options = {
  complexity: 0.3,
  contrast: 0.1,
  size: 1700,
  color: "#FF94E7",
  stroke: 0,
};

const options2 = {
  complexity: 0.3,
  contrast: 0.1,
  size: 2000,
  color: "#FF94E7",
  stroke: 0,
};

const Background = ({ svg, svg_ }) => (
  <div>
    <svg width="1900" height="1080">
      <g transform="translate(0,0)">
        <animated.path className="blob-gradient" d={svg} />
      </g>
      <g transform="translate(100,0)">
        <animated.path className="blob-gradient" d={svg_} />
      </g>
    </svg>
  </div>
);

const FirstPage = () => {
  const [blob, change] = useState(blobs.editable(options));

  const props3 = useSpring({
    config: { duration: 700 },
    from: {
      svg: blob.children[0].children[0].attributes.d,
    },
    to: async (next) => {
      while (1) {
        await next({
          svg: blobs.editable(options).children[0].children[0].attributes.d,
        });
      }
    },
  });

  const props1 = useSpring({
    config: { duration: 1000 },
    from: {
      svg: blob.children[0].children[0].attributes.d,
    },
    to: async (next) => {
      while (1) {
        await next({
          svg: blobs.editable(options2).children[0].children[0].attributes.d,
        });
      }
    },
  });

  return (
    <div name="main" className="mainSection sectionCenter" id="main">
      <div className="titleWrap">
        <h1 className="mainTitle">
          <span className="titleName1">KYOUNGJIN</span>
          <span className="titleName2">PORTFOLIO</span>
        </h1>
        <p>안녕하세요. 오경진의 포트폴리오입니다.</p>
      </div>
      <div
        className="mainBgSvg"
        onClick={() => change(blobs.editable(options))}
      >
        <Background svg={props3.svg} svg_={props1.svg} />
      </div>
      <span className="scrollDown">
        <span className="text">Scroll Down</span>
      </span>
    </div>
  );
};

export default FirstPage;
