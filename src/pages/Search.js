import React, { useState } from "react";
import Input from "../components/Input";
import Results from "../components/Results";
import Spinner from "react-bootstrap/Spinner";

import FavList from "../components/FavList";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const SearchContainer = () => {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ====================================
  // Fetch shows from API based on query input
  // ====================================

  const url = "https://api.tvmaze.com/search/shows?q=";

  const fetchShow = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url + query);
      const rawData = await res.json();
      console.log(rawData);

      // ===============================
      // Extract name and medium image from fetch result
      // - set a placeholder image for shows without pics (otherwise will show broken image link)
      // - removes HTML element tags from show description
      //
      // a5 = 'Cat' && 'Dog'       // t && t returns "Dog"
      // a2 = true && false;       // t && f returns false
      // o5 = "Cat" || "Dog";      // t || t returns "Cat"
      // o6 = false || "Cat";      // f || t returns "Cat"
      // ===============================

      const filteredData = rawData.map((result) => {
        let { name, image, officialSite, url, summary } = result.show;
        return {
          title: name,
          image: (image && image.medium) || "https://i.imgur.com/V8olf7q.png",
          site: officialSite || url,
          synopsis: (summary || "Coming soon!").replace(/<\/?[^>]+>/gi, ""),
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
  // 2 Functions to:
  // - handleSearchInput: manage changes to input field
  // - onSubmitQuery: initiate fetch request
  // ===========================

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const onSubmitQuery = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      fetchShow();
      setHasSearched(true);
      //   setQuery("");
    }
  };

  // ===========================
  // Image, Error, or Loading check
  // ===========================

  let content = "";

  if (shows) {
    content = <Results shows={shows} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <div className="centered">
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
                {content}
              </Tab>
              <Tab eventKey="favourites" title="Favourites">
                <FavList />
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

export default SearchContainer;
