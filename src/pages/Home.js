import React, { useState, useEffect } from "react";
import CarouselMovie from "../components/CarouselMovie";
import CarouselTV from "../components/CarouselTV";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const [comingSoon, setComingSoon] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);

  //================
  // API2: Upcoming Movies (IMDB-API)
  //================

  const url =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=03c16b8a9560a4ea683a37f203c3e79f&language=en-US&page=1";

  const fetchComingSoon = async () => {
    const res = await fetch(url);
    const rawData = await res.json();
    console.log(rawData.results);

    const filteredData = rawData.results.map((result) => {
      const { original_title, poster_path, id, release_date } = result;
      return {
        title: original_title,
        image: "https://image.tmdb.org/t/p/w500" + poster_path,
        id: id,
        info: `(${release_date})`,
      };
    });

    setComingSoon(filteredData);
    console.log(filteredData);
  };

  //================
  // API2: Trending Movies (TMDB)
  //================

  const url2 =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=03c16b8a9560a4ea683a37f203c3e79f";

  const fetchPopularMovie = async () => {
    const res2 = await fetch(url2);
    const rawData2 = await res2.json();

    const filteredData2 = rawData2.results.map((result) => {
      const { original_title, poster_path, id, vote_average } = result;
      return {
        title: original_title,
        image: "https://image.tmdb.org/t/p/w500" + poster_path,
        id: id,
        info: `(${vote_average} / 10)`,
      };
    });

    setTrendingMovie(filteredData2);
    console.log(filteredData2);
  };

  //================
  // API2: Trending TV Shows (TMDB)
  //================

  const url3 =
    "https://api.themoviedb.org/3/trending/tv/week?api_key=03c16b8a9560a4ea683a37f203c3e79f";

  const fetchPopularTv = async () => {
    const res3 = await fetch(url3);
    const rawData3 = await res3.json();

    const filteredData3 = rawData3.results.map((result) => {
      const { original_name, poster_path, id, vote_average } = result;
      return {
        title: original_name,
        image: "https://image.tmdb.org/t/p/w500" + poster_path,
        id: id,
        info: `(${vote_average} / 10)`,
      };
    });

    setTrendingTv(filteredData3);
    console.log(filteredData3);
  };

  //===========

  useEffect(() => {
    fetchComingSoon();
    fetchPopularTv();
    fetchPopularMovie();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container className="carousel-container">
        <Row>
          <Col>
            <h1>Upcoming Movies</h1>
            <br />
            <CarouselMovie shows={comingSoon} />
          </Col>
          <Col>
            <h1>Popular Movies</h1>
            <br />
            <CarouselMovie shows={trendingMovie} />
          </Col>
          <Col>
            <h1>Popular TV Shows</h1>
            <br />
            <CarouselTV shows={trendingTv} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
