import React, {
  Fragment,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
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

const AppNavbar = () => {
  let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );
  console.log(userRole, "UserRole");

  const targetId = useRef([]);
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

  const hendleClick = (e) => {
    e.preventDefault();
    console.log(window.location.hash, "hash");
    const target = e.target.getAttribute("href");
    const element = document.querySelector(target.slice(1));
    let url = target.slice(1);
    setActive(
      links.map((link) =>
        link.url === url ? { ...link, active: !link.active } : link
      )
    );
    history.push(target);
    // window.history.pushState(null, null, target);
    const location = element.offsetTop;
    console.log(links[0].url, "id");
    const initialPosition = window.scrollY;
    const duration = 200;
    animateScroll({
      targetPosition: location,
      initialPosition,
      duration,
    });
  };

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
            {/* <SearchInput isOpen={isOpen} /> */}
            <Nav className="ml-auto d-felx justify-content-around" navbar>
              {links.map((link) => {
                return (
                  <NavItem className="nav-link">
                    <Link
                      to={link.url}
                      key={link.id}
                      onClick={hendleClick}
                      className={link.active ? "on" : null}
                    >
                      {link.text}
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
