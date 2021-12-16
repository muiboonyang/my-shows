import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <br />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
