import React from "react";
import ReactDOM from "react-dom";
import { Parallax } from "react-spring";

const Page = ({ offset, caption, first, second, gradient, onClick }) => (
  <>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div>
        <svg viewBox="0 0 480 500" preserveAspectRatio="xMidYMid meet">
          <path d="M826.756834,38.5 L316.672645,38.5 C239.942445,81.629916 210.858493,143.53956 229.352505,224.342576 C262.43959,368.904847 229.510282,478.475873 128.208674,524.33023 C118.47076,528.738115 109.507212,532.794704 101.318028,536.5 L611.328131,536.5 C619.629947,532.743775 628.732741,528.624181 638.636513,524.141221 C739.428339,478.517618 772.210393,369.436574 739.217923,225.287691 C720.644234,144.136554 749.846852,81.8366574 826.756834,38.5 Z" />
        </svg>
      </div>
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </Parallax.Layer>

    <Parallax.Layer className="text number" offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className="text header" offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: 20 }}>{caption}</p>
        <div className={`stripe ${gradient}`} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </Parallax.Layer>
  </>
);

const SecondPage = () => {
  scroll = (to) => this.refs.parallax.scrollTo(to);

  return (
    <div name="portfolio" className="section" id="portfolio">
      <Parallax
        className="container"
        ref="parallax"
        pages={3}
        horizontal
        scrolling={false}
      >
        <Page
          offset={0}
          gradient="pink"
          caption="who we are"
          first="Sirisoft"
          second="Hackathon"
          onClick={() => scroll(1)}
        />
        <Page
          offset={1}
          gradient="teal"
          caption="what we do"
          first="consectetur"
          second="adipiscing elit"
          onClick={() => scroll(2)}
        />
        <Page
          offset={2}
          gradient="tomato"
          caption="what we want"
          first="Morbi quis"
          second="est dignissim"
          onClick={() => scroll(0)}
        />
      </Parallax>
    </div>
  );
};

export default SecondPage;
