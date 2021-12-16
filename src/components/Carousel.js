import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { v4 as uuidv4 } from "uuid";

const showsCarousel = (props) => {
  let showsCarousel = props.shows.map((show) => {
    return (
      <Carousel.Item interval={3000} key={uuidv4()}>
        <a
          href={`https://www.themoviedb.org/${show.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <img className="d-block w-100" src={show.image} alt={show.title} />
        </a>
        <Carousel.Caption>
          <p className="carousel-title">
            <a
              href={`https://www.themoviedb.org/${show.id}`}
              target="_blank"
              rel="noreferrer"
              className="showtitle"
            >
              {show.title}

              <br />
              {show.info}
            </a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return <Carousel>{showsCarousel}</Carousel>;
};

export default showsCarousel;
