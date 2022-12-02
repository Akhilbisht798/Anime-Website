import React, { useEffect, useState } from "react";

const Rated = () => {

    const [topRatedMovie, setTopRatedMovie] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);

    useEffect(() => {
        const getRated = async () => {
            fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" +
                process.env.REACT_APP_MOVIE_DB + "&language=en-US&page=1")
                .then(response => response.json())
                .then(response => response.results)
                .then(response => setTopRatedMovie(response))
        }

        const getRatedTV = async () => {
            fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=" +
                process.env.REACT_APP_MOVIE_DB + "&language=en-US&page=1")
                .then(response => response.json())
                .then(response => response.results)
                .then(response => setTopRatedTV(response))
        }

        getRated();
        getRatedTV();
    }, [])

    return (
        <>
            <h2>Movies</h2>
            {topRatedMovie.map((curr) => {
                return (
                    <div key={curr.id}>
                        {curr.title}
                    </div>
                )
            })}

            <h2>T.V. Shows</h2>
            {topRatedTV.map((curr) => {
                return (
                    <div key={curr.id}>
                        {curr.name}
                    </div>
                )
            })}
        </>
    )
}

export default Rated;