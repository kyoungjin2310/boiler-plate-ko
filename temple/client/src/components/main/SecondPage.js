import { useState, useCallback } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import styled from "styled-components";
import { portfolioLinks } from "../main/data";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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
  padding: calc(10em + 56px) 0 10em;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  background: #929292;
`;

const Slide = styled.div`
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease-out;

  @include mobile {
    height: 100vh;
    flex-direction: column;
    justify-content: center;
  }
`;

const SecondPage = ({ links = portfolioLinks, ...props }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0)
      : setCurrentSlide(
          currentSlide + 1 >= links.length ? 0 : currentSlide + 1
        );
  };

  return (
    <Wrapper {...props}>
      <BsArrowLeft
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
            key={obj.id}
          >
            <div className="cardWrap">
              <Card>
                <CardBody className="imgWrap">
                  <CardImg
                    top
                    width="100%"
                    src={`/images/${obj.src}`}
                    alt={obj.alt}
                  />
                </CardBody>
                <CardBody className="cardExplan">
                  <CardTitle tag="h5">
                    {obj.id < 10 ? "0" + obj.id : obj.id}
                  </CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    {obj.title}
                    <span className="cardSubTitle">{obj.subTitle}</span>
                  </CardSubtitle>
                  <CardText>{obj.text}</CardText>
                  <ul className="cardList">
                    {obj.skills.map((list, index) => (
                      <li key={index}>
                        {list === "GitHub" ? (
                          <a
                            className="cardLink"
                            href={obj.gitHubUrl}
                            target="_blank"
                            title="깃허브 바로가기"
                          >
                            {list}
                          </a>
                        ) : (
                          list
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button className="visitSite">
                    Visit Site
                    <BsArrowRight className="btnArrow" />
                  </Button>
                </CardBody>
              </Card>
            </div>
          </Slide>
        ))}
      </ChildrenWrapper>
      <BsArrowRight
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
