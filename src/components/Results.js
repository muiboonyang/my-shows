import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import FavContext from "../context/fav-context";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const Results = (props) => {
  const favCtx = useContext(FavContext);

  // ==================================================
  // Display results in Cards with the following info:
  // - Image
  // - Name
  // - Synopsis (within Accordian)
  // - Link to watch
  // ===================================================

  let results = props.shows.map((show) => {
    return (
      <Card
        className="card border-dark mb-3 mx-2"
        style={{ width: "19rem" }}
        key={uuidv4()}
      >
        <Card.Img
          variant="top"
          className="cards"
          id={uuidv4()}
          src={show.image}
          alt={show.title}
          onClick={favCtx.addFavourite}
        />

        <Card.Body>
          <Card.Title>{show.title}</Card.Title>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Synopsis</Accordion.Header>
              <Accordion.Body className="summary">
                {show.synopsis}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>

        <Card.Footer className="footer">
          <>
            <Button
              variant="outline-danger"
              onClick={(e) => {
                e.preventDefault();
                window.open(show.site);
              }}
            >
              Watch here
            </Button>
          </>
        </Card.Footer>
      </Card>
    );
  });

  return (
    <>
      <div className="results">
        <h2>
          Search Results <Badge bg="primary">{results.length}</Badge>
        </h2>
        <p>
          Click on a poster to add to your favourites. Click on the 'Favourites'
          tab to view them.
        </p>
      </div>
      <div className="row">{results}</div>
    </>
  );
};

export default Results;
