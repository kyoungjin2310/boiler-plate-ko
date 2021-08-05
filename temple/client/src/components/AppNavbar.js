import React, { Fragment, useState, useCallback, useEffect } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Form,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST } from "../redux/types";
import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";
import { Link, useHistory } from "react-router-dom";
import { links } from "./main/data";
import { animateScroll } from "./main/animationScroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const AppNavbar = () => {
  let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(links);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );
  console.log(userRole, "UserRole");

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POSTS_WRITE_REQUEST,
    });
  };

  const hendleClick = useCallback(
    (e, id) => {
      e.preventDefault();
      console.log(window.location.hash, "hash");
      const target = e.target.getAttribute("href");
      const element = document.querySelector(target.slice(1));
      const location = element.offsetTop;
      const initialPosition = window.scrollY;
      const duration = 200;
      setActive(
        active.map((link) =>
          link.id === id ? { ...link, active: !link.active } : link
        )
      );
      console.log(active, "links");
      console.log(id, "id");
      history.push(target);
      animateScroll({
        targetPosition: location,
        initialPosition,
        duration,
      });
    },
    [active]
  );

  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "Main" ? (
          <Form className="col mt-2">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3"
              onClick={addPostClick}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`}>
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>No User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="#" className="">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              <NavItem className="nav-link">
                <Link to="https://github.com/kyoungjin2310">gitHub</Link>
              </NavItem>
              {active.map((link, index) => {
                return (
                  <NavItem className="nav-link">
                    <Link
                      to={link.url}
                      key={link.id}
                      onClick={(e) => hendleClick(e, link.id)}
                      className={link.active ? "on" : ""}
                    >
                      {link.id === 1 ? (
                        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                      ) : (
                        link.text
                      )}
                    </Link>
                  </NavItem>
                );
              })}

              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavbar;
