import React, { useEffect, useState } from "react";
import ReactRouter from "./Router";

const Home = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState(() => []);
    const [showResults, setShowResults] = useState(() => false)

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
                <ReactRouter />
            )}
            {showResults && (
                <div>
                    <button
                        onClick={() => setShowResults(false)}>Back</button>
                    {results.map((curr) => {
                        return (
                            <div>
                                {curr.original_title}
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Home;