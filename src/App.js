import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";

import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Search from "./pages/Search";

import FavContext from "./context/fav-context";

const App = () => {
  const [favourites, setFavourites] = useState([]);

  // ===========================
  // Favourite List
  // ===========================
  // Code to add shows to Favourite List
  // Set: collection of unique values (no duplicates)
  // Filter data to remove undefined elements
  // ===========================

  const addFavourite = (e) => {
    setFavourites((prevState) => {
      const newShow = document.getElementById(e.target.id);
      prevState.push(newShow.src);

      const uniqueShows = Array.from(new Set(prevState));

      let data = uniqueShows.filter(function (element) {
        return element !== undefined;
      });

      console.log(data);
      return data;
    });
  };

  // Code to remove shows from Favourite List
  // gets image's ID based on clicked image -> use splice to remove it from Favourite List

  const removeFavourite = (e) => {
    setFavourites((prevState) => {
      const targetParentId = e.target.parentElement.id;
      prevState.splice(targetParentId, 1);
      const data2 = prevState.map((d) => {
        return d;
      });
      console.log(data2);
      return data2;
    });
  };

  return (
    <BrowserRouter>
      <FavContext.Provider
        value={{ favourites, addFavourite, removeFavourite }}
      >
        <NavBar />
        <br />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </FavContext.Provider>
    </BrowserRouter>
  );
};

export default App;
