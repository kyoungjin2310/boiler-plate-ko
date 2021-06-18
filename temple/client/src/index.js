import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import loadUser from "./components/auth/loadUser";

//useEffect보다 먼저 나옴
loadUser();

ReactDOM.render(<App />, document.getElementById("root"));
