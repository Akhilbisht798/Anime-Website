import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Movie = (props) => {

    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        const getData = async () => {
            let show = props.data.movie === "true" ? "movie" : "tv";
            const link = "https://api.themoviedb.org/3/" + show + "/" +
                props.data.id + "?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US";
            fetch(link).then(response => response.json())
                .then(response => setMovieData(response))
        }
        getData();
    }, []);

    return (
        <>
            <button onClick={props.close}>Close</button>
            This is Id. {props.data.id}
        </>
    )
}

export default Movie;