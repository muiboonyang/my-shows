import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Favourites from "./pages/Favourites";
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
    <FavContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <br />
          <Switch>
            <Route exact path="/my-show-app/">
              <Home />
            </Route>

            <Route exact path="/my-show-app/search">
              <Search />
            </Route>

            <Route path="/my-show-app/favourites">
              <Favourites />
            </Route>

            <Route path="/my-show-app/contact">
              <Contact />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </FavContext.Provider>
  );
};

export default App;
