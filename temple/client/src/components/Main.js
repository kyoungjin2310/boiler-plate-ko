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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ThirdPage from "./main/ThirdPage";
import LastPage from "./main/LastPage";
import { HiOutlineMenu } from "react-icons/hi";
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
      console.log(curPage, "curPage up");
    } else {
      setCurPage(Math.min(curPage + 1, LEN - 1));
      console.log(curPage, "curPage down");
    }
  }, 500);

  const hendleClick = useCallback(
    (e, id) => {
      e.preventDefault();
      setCurPage(id - 1);
      setActive(
        active.map((link) =>
          link.id === id ? { ...link, active: !link.active } : link
        )
      );
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
            <NavbarToggler className="menuIconWrap" onClick={handleToggle}>
              <HiOutlineMenu className="menuIcon" />
            </NavbarToggler>
            <a
              href="https://github.com/kyoungjin2310"
              target="_blank"
              className="gitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="gitHubIcon" />
              GitHub
            </a>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto d-felx justify-content-around" navbar>
                {active.map((link, index) => {
                  return (
                    <NavItem className="nav-link" key={link.id}>
                      <Link
                        to={link.url}
                        key={link.id}
                        onClick={(e) => hendleClick(e, link.id)}
                        className={link.active ? "on" : ""}
                      >
                        {link.id === 1 ? (
                          <FontAwesomeIcon icon={faHome} className="menuHome" />
                        ) : (
                          link.text
                        )}
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
          transition: "top 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
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
            {index === 2 ? <ThirdPage /> : null}
            {index === 3 ? <LastPage /> : null}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Main;
