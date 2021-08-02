import React, {
  Fragment,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import FirstPage from "./main/FirstPage";
import SecondPage from "./main/SecondPage";
import { Link, useHistory } from "react-router-dom";
import { links } from "./main/data";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";

const LEN = links.length;

function useThrottle(fn, delay) {
  let timer = useRef(null);
  return function (...args) {
    if (!timer.current) {
      fn.apply(null, args);
      timer.current = setTimeout(() => {
        timer.current = null;
      }, delay);
    }
  };
}

const Main = () => {
  const [curPage, setCurPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(links);
  const arr = active.map((n) => n.url);
  let history = useHistory();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const setHistory = useCallback(() => {
    const sectionArr = links.map((n) => n.url);
    console.log(sectionArr);
    const target = document.querySelector(".full-page");
    const targetValue = -(parseInt(target.style.top) / 100);
    history.push(sectionArr[targetValue]);
  }, [curPage]);

  const handleWheel = useThrottle((e) => {
    let delta = e.deltaY;
    if (delta < 0) {
      setCurPage(Math.max(curPage - 1, 0));
      console.log(curPage < 0 ? arr[0] : arr[curPage - 1], "curPage up");
    } else {
      setCurPage(Math.min(curPage + 1, LEN - 1));
      console.log(curPage, "curPage down");
    }
  }, 500);

  const hendleClick = useCallback(
    (e, id) => {
      const target = e.target.getAttribute("href");
      e.preventDefault();
      setCurPage(id - 1);
      setActive(
        active.map((link) =>
          link.id === id ? { ...link, active: !link.active } : link
        )
      );
      console.log(active, "links");
      console.log(id, "id");
      history.push(target);
    },
    [active]
  );

  useEffect(() => {
    setHistory();
  }, [curPage]);

  return (
    <div className="mainContainer" onWheel={(e) => handleWheel(e)}>
      <Fragment>
        <Navbar color="dark" dark expand="lg" className="sticky-top">
          <Container>
            <NavbarToggler onClick={handleToggle} />
            <Collapse isOpen={isOpen} navbar>
              {/* <SearchInput isOpen={isOpen} /> */}
              <Nav className="ml-auto d-felx justify-content-around" navbar>
                {active.map((link, index) => {
                  return (
                    <NavItem className="nav-link">
                      <Link
                        to={link.url}
                        key={link.id}
                        onClick={(e) => hendleClick(e, link.id)}
                        className={link.active ? "on" : ""}
                      >
                        {link.text}
                      </Link>
                    </NavItem>
                  );
                })}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
      <div
        className="full-page"
        style={{
          position: "relative",
          height: "100vh",
          top: `-${curPage * 100}vh`,
          transition: "top 0.5s ease",
        }}
      >
        {links.map((el, index) => (
          <section
            className={curPage === index ? "mainSection active" : "mainSection"}
            id={el.text}
            key={el.id}
          >
            {index === 0 ? <FirstPage /> : null}
            {index === 1 ? <SecondPage /> : null}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Main;
