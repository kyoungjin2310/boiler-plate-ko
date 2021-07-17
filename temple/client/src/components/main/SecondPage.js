import { useRef, useState } from "react";
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

const Indicator = ({ currentSlide, amountSlides }) => {
  return (
    <IndicatorWrapper>
      {Array(amountSlides)
        .fill(1)
        .map((_, i) => (
          <Dot key={i} isActive={currentSlide === i} />
        ))}
    </IndicatorWrapper>
  );
};

const Wrapper = styled.div`
  border: 3px solid red;
  height: 100vh;
  width: 100%;
  display: nowrap;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
`;

const Slide = styled.div`
  float: left;
  height: 100vh;
  width: 100%;
  flex-shrink: 0;
  border: 4px solid green;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div``;

// const SlideContainer = styled.div``;

// const history = useHistory();
// const location = useLocation();

const SecondPage = ({ links = portfolioLinks, ...props }) => {
  const nextSlider = (sliderIndex = currentSlide + 1) => {
    const newSlideIndex =
      currentSlide > links.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlideIndex);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide, "currentSlide");
  return (
    <Wrapper {...props}>
      <ChildrenWrapper style={{ width: `${links.length * 100}%` }}>
        {links.map((obj, index) => (
          <Slide
            className={obj.text}
            key={obj.id}
            style={{
              marginLeft: index === 0 ? `${currentSlide * 100}` : undefined,
              width: `${100 / links.length}%`,
            }}
          >
            {obj.text}
          </Slide>
        ))}
      </ChildrenWrapper>
      <Indicator currentSlide={currentSlide} amountSlides={links.length} />
    </Wrapper>
  );
};

export default SecondPage;
