import React, { useState } from "react";
import Input from "../components/Input";
import Results from "../components/Results";
import Spinner from "react-bootstrap/Spinner";

import FavList from "../components/FavList";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const apiKey = `${process.env.REACT_APP_API_KEY}`;

const Search = () => {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);

  // ====================================
  // Fetch shows from API based on query input
  // ====================================

  const fetchShow = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&region=SG`
      );

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const rawData = await res.json();
      console.log(rawData.results);

      // ===============================
      // Extract releavant info from fetch result
      // - set a placeholder image for shows without pics (otherwise will show broken image link)
      //
      // o5 = "Cat" || "Dog";      // t || t returns "Cat"
      // o6 = false || "Cat";      // f || t returns "Cat"
      // ===============================

      const filteredData = rawData.results.map((result) => {
        let { original_title, name, poster_path, id, overview, media_type } =
          result;

        if (poster_path) {
          poster_path = `https://image.tmdb.org/t/p/w500${poster_path}`;
        } else {
          poster_path = "https://i.imgur.com/uBHanp4.png";
        }

        if (media_type === "tv") {
          id = `tv/${id}`;
        } else {
          id = `movie/${id}`;
        }

        return {
          title: original_title || name,
          image: poster_path,
          synopsis: overview || "Coming soon!",
          site: `https://www.themoviedb.org/${id}`,
        };
      });

      setShows(filteredData);
      console.log(shows);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  // ===========================
  // Favourite List
  // ===========================
  // Code to add shows to Favourite List
  // Filter data:
  // - removeDuplicates() to ensure no duplicates (only 1 copy of the show to be added to favourites)
  // - Filter() method to remove undefined elements + create a new Array
  // ===========================

  const addFavourite = (e) => {
    setFavourites((prevState) => {
      const newShow = document.getElementById(e.target.id);

      prevState.push({
        image: newShow.src,
        title: newShow.alt,
      });

      const removeDuplicates = (originalArray, objKey) => {
        let uniqueArray = [];
        let values = [];
        let value;

        for (let i = 0; i < originalArray.length; i++) {
          value = originalArray[i][objKey];

          if (values.indexOf(value) === -1) {
            uniqueArray.push(originalArray[i]);
            values.push(value);
          }
        }
        return uniqueArray;
      };

      let uniqueShows = removeDuplicates(prevState, "image");

      let data = uniqueShows.filter(function (element) {
        return element !== undefined;
      });

      console.log(data);
      return data;
    });
  };

  //=================================
  // Code to remove shows from Favourite List
  // gets image's ID based on clicked image -> use splice to remove it from Favourite List
  // use Map to create a new array
  //=================================

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

  // ===========================
  // 3 Functions to:
  // - handleSearchInput: manage changes to input field
  // - onSubmitQuery: initiate fetch request
  // - handleKeyPress: allow submits using 'Enter' key
  // ===========================

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const onSubmitQuery = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      fetchShow();
      setHasSearched(true);
    }
  };

  const handleKeyPress = (target) => {
    if (target.charCode === 13 && query.length > 0) {
      fetchShow();
      setHasSearched(true);
    }
  };

  // ===========================
  // Image, Error, or Loading check
  // ===========================

  let searchResults = "";

  if (shows) {
    searchResults = <Results shows={shows} addFavourite={addFavourite} />;
  }

  if (error) {
    searchResults = <p>{error}</p>;
  }

  if (isLoading) {
    searchResults = (
      <div className="spinner">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  // =========================
  // Return
  // - Using ternary operator + hasSearched state to display either component
  // - hasSearched = false -> show page with Search bar / true -> show page with Results + "back to search" button)
  // =========================

  return (
    <>
      <div className="SearchContainer">
        <Input
          handleSearchInput={handleSearchInput}
          onSubmitQuery={onSubmitQuery}
          handleKeyPress={handleKeyPress}
          query={query}
        />
        <br />
        {hasSearched ? (
          <>
            <Tabs
              defaultActiveKey="results"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="results" title="Results">
                {searchResults}
              </Tab>
              <Tab eventKey="favourites" title="Favourites">
                <FavList
                  favourites={favourites}
                  removeFavourite={removeFavourite}
                />
              </Tab>
            </Tabs>
            <br />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Search;
