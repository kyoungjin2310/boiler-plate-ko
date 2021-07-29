import { useRef, useState, useCallback } from "react";
import {
  Redirect,
  Route,
  Switch,
  Link,
  useLocation,
  useParams,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import styled from "styled-components";
import { links, portfolioLinks } from "../main/data";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 750ms all ease-in-out;
`;

const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot
            key={i}
            isActive={currentSlide === i}
            onClick={() => nextSlide(i)}
          />
        ))}
    </IndicatorWrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  background: #929292;
`;

const Slide = styled.div`
  height: 100vh;
  width: 100%;
  flex-shrink: 0;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  height: 350px;
  display: flex;
  transition: all 1s ease-out;

  @include mobile {
    height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
`;

// const SlideContainer = styled.div``;

// const history = useHistory();
// const location = useLocation();

const SecondPage = ({ links = portfolioLinks, ...props }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(currentSlide, "currentSlide");
  const nextSlide = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)
      : setCurrentSlide(
          currentSlide + 1 >= links.length ? 0 : currentSlide + 1
        );
  };

  return (
    <Wrapper {...props}>
      <FaChevronLeft
        className="left arrow"
        onClick={() => {
          nextSlide();
        }}
      />
      <ChildrenWrapper
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {links.map((obj, index) => (
          <Slide
            className={index === currentSlide ? "slide active" : "slide"}
            key={index}
          >
            {obj.text}
          </Slide>
        ))}
      </ChildrenWrapper>
      <FaChevronRight
        className="right arrow"
        onClick={() => {
          nextSlide();
        }}
      />
      <Indicator
        currentSlide={currentSlide}
        amountSlides={links.length}
        nextSlide={nextSlide}
      />
    </Wrapper>
  );
};

export default SecondPage;
