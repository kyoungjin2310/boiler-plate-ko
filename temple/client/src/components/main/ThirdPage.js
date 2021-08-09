import React, { useState, useRef, useLayoutEffect } from "react";
import { careerList } from "../main/data";

const ThirdPage = () => {
  return (
    <div className="AboutWrap">
      <div className="About">
        <h3 className="AboutTitle">
          career <span className="color">(퍼블리싱 - 2년 9개월)</span>
        </h3>
        <ul className="AboutList">
          {careerList.map((item, index) => (
            <li key={index}>
              <a href="#" className="AboutListTitle">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThirdPage;
