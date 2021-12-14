import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import FavContext from "../context/fav-context";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const FavList = () => {
  const favCtx = useContext(FavContext);

  let favouriteList = favCtx.favourites.map((url, index) => {
    return (
      <Card
        className="card border-dark mb-3 mx-1"
        style={{ width: "16rem" }}
        key={uuidv4()}
        id={index}
      >
        <Card.Img variant="top" src={url} />
        <Button variant="danger" onClick={favCtx.removeFavourite}>
          X
        </Button>
      </Card>
    );
  });

  return (
    <>
      <div className="results">
        <h2>
          Favourites <Badge bg="primary">{favouriteList.length}</Badge>
        </h2>

        <p>
          Click on a poster from the search results to add to your favourites!
        </p>
      </div>
      <div className="row">{favouriteList}</div>
    </>
  );
};
export default FavList;
