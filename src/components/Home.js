import React, { useEffect, useState } from "react";
import ReactRouter from "./Router";
import styled from "styled-components";
import Movie from "./Home/Movie";

const MovieDiv = styled.div`
    padding: 1.2em;
    margin: 0.5em; 
    border: 2px solid black;
`;

const Overlay = styled.div`
    position: fixed; 
    top: 0;
    left: 0;
    right: 0; 
    bottom: 0;
    width: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Imformation = styled.div`
    position: absolute;
    top: 30%;
    left: 25%;
    translate: transform(-10%, -10%);
    width: 50%;
    height: 50%;
    background-color: white;
`

const Home = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState(() => []);
    const [showResults, setShowResults] = useState(() => false)
    const [selectedMovie, setSelectedMovie] = useState({});
    const [showDetailsMovie, setshowDetailsMovie] = useState(() => false);

    const searchMovie = async (e) => {

        e.preventDefault();
        fetch("https://api.themoviedb.org/3/search/multi?api_key=" +
            process.env.REACT_APP_MOVIE_DB + "&language=en-US&query=" + search +
            "&page=1&include_adult=false")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setResults(response?.results);
            })
        setShowResults(true);
    }

    const showMovie = (e, show) => {
        const id = e.target.dataset.id;
        console.log(id)
        const Link = "https://api.themoviedb.org/3/" + show + "/" + id + "?api_key="
            + process.env.REACT_APP_MOVIE_DB + "&language=en-US";
        fetch(Link,).then((response) => response.json())
            .then(response => {
                console.log(response);
                return response;
            })
            .then((response) => setSelectedMovie(response))
        setshowDetailsMovie(true);
    }

    return (
        <>
            <div>
                <form onSubmit={searchMovie}>
                    <input type="text" placeholder="Search..." required
                        onChange={(e) => { setSearch(e.target.value) }} />
                    <button type="submit">Submit</button>
                </form>
                <a href="/">Home</a>
                <a href="/rated">Top Rated</a>
                <a href="/genre">Genre</a>
            </div>
            {!showResults && (
                <ReactRouter selectedMovie={showMovie} />
            )}
            {showResults && (
                <>
                    <button
                        onClick={() => setShowResults(false)}>Back</button>
                    {results.map((curr) => {
                        return (
                            <MovieDiv>
                                {curr.original_title}
                                <p>{curr.original_name}</p>
                            </MovieDiv>
                        )
                    })}
                </>
            )}
            {showDetailsMovie && (
                <Overlay>
                    <Imformation>
                        <button onClick={() => setshowDetailsMovie(false)} >Close</button>
                        <Movie data={selectedMovie} />
                    </Imformation>

                </Overlay>
            )}
        </>
    )
}

export default Home;