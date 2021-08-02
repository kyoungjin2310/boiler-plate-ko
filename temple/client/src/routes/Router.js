import React, { Fragment } from "react";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import Profile from "./normalRoute/Profile";
import Main from "../components/Main";
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";

const MyRouter = () => (
  <Fragment>
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/post" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
        <Route
          //useParams에서 categoryName을 사용
          path="/post/category/:categoryName"
          exact
          component={CategoryResult}
        />
        <Route path="/search/:searchTerm" exact component={Search} />
        <ProfileProtectedRoute
          path="/user/:userName/profile"
          exact
          component={Profile}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
  </Fragment>
);

export default MyRouter;
