import {
  Redirect,
  Route,
  Switch,
  Link,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import styles from "../../assets/custom.scss";
import classNames from "classnames/bind";
import { animated } from "react-spring";
import SecondPageAnimation from "./SecondPageAnimation";

const cx = classNames.bind(styles);

const Step1 = () => {
  return (
    <div className={cx("box")}>
      <Link to={"/2"} className={cx("link")}>
        A
      </Link>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className={cx("box")}>
      <Link to={"/3"} className={cx("link")}>
        B
      </Link>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className={cx("box")}>
      <div className={cx("link")}>C</div>
    </div>
  );
};
const StepWrapper = () => {
  const location = useLocation();
  const { id } = useParams();

  const locations = SecondPageAnimation(location, +id);

  return locations.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
        <Route path={"/1"} exact render={() => <Step1 />} />
        <Route path={"/2"} exact render={() => <Step2 />}></Route>
        <Route path={"/3"} exact render={() => <Step3 />}></Route>
      </Switch>
    </animated.div>
  ));
};

const SecondPage = () => {
  const history = useHistory();

  const goBack = () => {
    console.log(history);
    history.go(-1);
  };
  const goNext = () => {
    if (history.location.pathname === "/1") {
      history.push("/2");
      return;
    }
    if (history.location.pathname === "/2") {
      history.push("/3");
      return;
    }
    if (history.location.pathname === "/3") {
      history.push("/1");
    }
  };

  return (
    <div className={cx("article")}>
      <button onClick={goBack} className={cx("btn", "left")}>
        <span role="img" aria-label="back">
          ⬅️
        </span>
      </button>
      <Switch>
        <Route path={"/:id"} exact render={() => <StepWrapper />}></Route>
        <Redirect to={"/1"} />
      </Switch>
      <button onClick={goNext} className={cx("btn", "right")}>
        <span role="img" aria-label="back">
          ➡️
        </span>
      </button>
    </div>
  );
};

export default SecondPage;
