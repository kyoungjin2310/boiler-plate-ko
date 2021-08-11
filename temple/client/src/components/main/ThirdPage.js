import React, { useState, useCallback } from "react";
import { careerList } from "../main/data";
import { BsXDiamondFill } from "react-icons/bs";

const ThirdPage = () => {
  const [curNum, setNum] = useState(0);
  const hendleClick = useCallback(
    (e, index) => {
      e.preventDefault();
      setNum(index);
    },
    [curNum]
  );
  return (
    <div className="careerWrap">
      <div className="career">
        <div className="careerBg">
          <h3 className="careerTitle">
            Career <span className="color">(퍼블리싱 - 2년 9개월)</span>
          </h3>
          <ul className="careerList">
            {careerList.map((item, index) => (
              <li key={index} className={curNum === index ? "active" : null}>
                <a
                  href="#"
                  className="careerListTitle"
                  onClick={(e) => hendleClick(e, index)}
                >
                  <BsXDiamondFill className="icon" />
                  {item.name}
                </a>
                <div className="careerDetails">
                  <div className="careerWarp2">
                    <h4 className="title">{item.name}</h4>
                    <p>{item.details}</p>
                    <p className="date">{item.detailsDate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
