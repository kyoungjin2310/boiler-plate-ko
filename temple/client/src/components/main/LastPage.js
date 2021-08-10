import React from "react";
import { about } from "./data";

const Lastpage = () => {
  return (
    <div className="about">
      <h3>About</h3>
      <ul>
        {about.map((list, index) => (
          <li key={index}>
            <h4>{list.name}</h4>
            {list.name === "Skills" ? (
              <div>
                <ul>
                  {list.details.map((list, index) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>{list.details}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lastpage;
