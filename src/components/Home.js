import React, { useEffect, useState } from "react";
import ReactRouter from "./Router";

const Home = () => {

    const [search, setSearch] = useState("");

    const Search = async (e) => {

        e.preventDefault();
        fetch("https://api.themoviedb.org/3/search/multi?api_key=" +
            process.env.REACT_APP_MOVIE_DB + "&language=en-US&query=" + search +
            "&page=1&include_adult=false")
            .then(response => response.json())
            .then(response => console.log(response))
    }

    return (
        <>
            <div>
                <form onSubmit={Search}>
                    <input type="text" placeholder="Search..."
                        onChange={(e) => { setSearch(e.target.value) }} />
                    <button type="submit">Submit</button>
                </form>
                <a href="/">Home</a>
                <a href="/rated">Top Rated</a>
                <a href="/genre">Genre</a>
            </div>
            <ReactRouter />
        </>
    )
}

export default Home;