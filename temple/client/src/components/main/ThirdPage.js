import React, { useState, useRef, useLayoutEffect } from "react";
import moment from "moment";
import { careerList } from "../main/data";

const ThirdPage = () => {
  const datesInterval = 60;
  const timelineMinWidth = 690;

  const eventsDivRef = useRef();
  const eventsWrapperDivRef = useRef();

  const [eventsTransform, setEventsTransform] = useState(null);
  const [eventsWidth, setEventsWidth] = useState(null);
  const [eventsWrapperWidth, setEventsWrapperWidth] = useState(null);
  const [isPreviousInactive, setPreviousInactive] = useState(true);
  const [currenSelection, setCurrentSelection] = useState(null);

  let eventsStyle = {
    width: "1140px",
  };
  let fillingLineStyle = {
    transform: "scaleX(0.125555)", //TODO
  };

  /*** WARNING ***/
  /* isSelected must be set to TRUE for ONE item ONLY */
  /* isSelected & isOlderEvent must not be set to TRUE at same time */
  const timeline = careerList;

  var datesIntervalMinimal = minLapse();
  setTimelineWidth();
  setDateOnTimeline();
  fillTimelineInit();

  // set the dates interval on timeline
  function setDateOnTimeline() {
    for (var i = 0; i < timeline.length; i++) {
      var d1 = moment(timeline[0].date, "DD/MM/YYYY");
      var d2 = moment(timeline[i].date, "DD/MM/YYYY");
      var distance = d2.diff(d1, "days");
      var distanceNorm = Math.round(distance / datesIntervalMinimal) + 2;
      timeline[i].style = { left: `${distanceNorm * datesInterval}px` };
      //console.log(timeline[i]);
    }
  }

  // return the minimum distance among events
  function minLapse() {
    var dateDistances = [];
    for (var i = 1; i < timeline.length; i++) {
      var d1 = moment(timeline[i - 1].date, "DD/MM/YYYY");
      var d2 = moment(timeline[i].date, "DD/MM/YYYY");
      dateDistances.push(d2.diff(d1, "days"));
    }
    return Math.min.apply(null, dateDistances);
  }

  // return the timeline width according to events
  function setTimelineWidth() {
    var d1 = moment(timeline[0].date, "DD/MM/YYYY");
    var d2 = moment(timeline[timeline.length - 1].date, "DD/MM/YYYY");
    var timeSpan = d2.diff(d1, "days");
    var timeSpanNorm = Math.round(timeSpan / datesIntervalMinimal) + 4;
    var totalWidth = timeSpanNorm * datesInterval;

    eventsStyle = {
      width: `${
        totalWidth < timelineMinWidth ? timelineMinWidth : totalWidth
      }px`,
    };
  }

  // set the current timeline fill according to the last selected date
  function fillTimelineInit() {
    var selectedEvent = timeline.findIndex((x) => x.isSelected);
    var event = timeline[selectedEvent].style.left;
    var eventPosX = parseInt(event.replace("px", ""), 10) + 20;
    var totalWidth = parseInt(eventsStyle.width.replace("px", ""), 10);

    var scaleValue = eventPosX / totalWidth;

    fillingLineStyle = {
      transform: `scaleX(${scaleValue})`,
    };
  }

  function getTimelineTranslateValue() {
    let translateValue = 0;

    if (eventsTransform.indexOf("(") >= 0) {
      translateValue = eventsTransform.split("(")[1];
      translateValue = translateValue.split(")")[0];
      translateValue = translateValue.split(",");
      translateValue = parseInt(translateValue[4], 10);
    }

    return translateValue;
  }

  function translateTimeline(value, totalWidth) {
    // translate only negative value
    value = value > 0 ? 0 : value;
    // limited to timeline width
    value =
      !(typeof totalWidth === "undefined") && value < totalWidth
        ? totalWidth
        : value;

    console.log(value);

    //eventsStyle.transform = `translateX(${value}px)`;
    eventsDivRef.current.style.transform = `translateX(${value}px)`;

    if (value === 0) setPreviousInactive(true);
    if (value === totalWidth) setPreviousInactive(false);
  }

  useLayoutEffect(() => {
    setEventsTransform(window.getComputedStyle(eventsDivRef.current).transform);
    setEventsWidth(
      parseInt(window.getComputedStyle(eventsDivRef.current).width, 10)
    );
    setEventsWrapperWidth(
      parseInt(window.getComputedStyle(eventsWrapperDivRef.current).width, 10)
    );
  }, [eventsTransform, eventsWidth, eventsWrapperWidth]);

  // UI interaction with timeline right arrow
  function slideNext(e) {
    e.preventDefault();
    var translateValue = getTimelineTranslateValue();
    translateTimeline(
      translateValue - eventsWrapperWidth + datesInterval,
      eventsWrapperWidth - eventsWidth
    );
  }

  // UI interaction with timeline right arrow
  function slidePrevious(e) {
    e.preventDefault();
    var translateValue = getTimelineTranslateValue();
    translateTimeline(translateValue + eventsWrapperWidth - datesInterval);
  }

  return (
    <div className="cd-horizontal-timeline loaded">
      <div className="timeline">
        <div ref={eventsWrapperDivRef} className="events-wrapper">
          <div ref={eventsDivRef} className="events" style={eventsStyle}>
            <ol>
              {timeline &&
                timeline.map((item, index) => (
                  <li key={index}>
                    <a
                      href="void(0)"
                      data-date={item.date}
                      className={`${item.isSelected ? "selected" : ""} ${
                        item.isOlderEvent ? "older-event" : ""
                      }`}
                      style={item.style}
                      onClick={() => setCurrentSelection(item)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
            </ol>

            <span
              className="filling-line"
              aria-hidden="true"
              style={fillingLineStyle}
            />
          </div>
        </div>

        <ul className="cd-timeline-navigation">
          <li>
            <a
              href="void(0)"
              className={`prev ${isPreviousInactive ? "inactive" : ""}`}
              onClick={slidePrevious}
            >
              Prev
            </a>
          </li>
          <li>
            <a
              href="void(0)"
              className={`next ${!isPreviousInactive ? "inactive" : ""}`}
              onClick={slideNext}
            >
              Next
            </a>
          </li>
        </ul>

        <div class="events-content">
          <h3>{currenSelection && currenSelection.name}</h3>
          <p>{currenSelection && currenSelection.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
