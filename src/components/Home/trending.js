import React, { useState, useEffect } from "react";

const Trending = () => {

    const [trendingMovie, setTrendingMovie] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);

    const gettrendingMovies = async () => {

        const Trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=" + process.env.REACT_APP_MOVIE_DB;

        fetch(Trending).then((response) => response.json())
            .then(response => response.results)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(response => setTrendingMovie(response))
    }

    const getTrendingTV = async () => {

        const Trending = "https://api.themoviedb.org/3/trending/tv/day?api_key=" + process.env.REACT_APP_MOVIE_DB;

        fetch(Trending).then((response) => response.json())
            .then(response => response.results)
            .then(response => {
                console.log(response);
                return response;
            })
            .then(response => setTrendingTV(response))
    }

    useEffect(() => {
        gettrendingMovies();
        getTrendingTV();
    }, [])

    return (
        <>
            <div>
                <h1>Movies</h1>
                {trendingMovie.map((curr) => {
                    return (
                        <div key={curr.id}>
                            <img src={"https://image.tmdb.org/t/p/w500/" + curr.backdrop_path} />
                            {curr.title}
                        </div>
                    )
                })}
            </div>
            <div>
                <h1>T.V Shows</h1>
                {trendingTV.map((curr) => {
                    return (
                        <div>
                            <img src={"https://image.tmdb.org/t/p/w500/" + curr.backdrop_path} />
                            {curr.name}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Trending;