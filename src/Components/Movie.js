import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai"
import { GoPrimitiveDot } from "react-icons/go"
import { AiFillStar } from "react-icons/ai"

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.7em;
`;

const PosterImage = styled.img`
    width: 250px
`;

const MovieDetails = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 1.2em;
    @media (max-width: 490px) {
        flex-wrap: wrap;
    }
`;

const BackdropImage = styled.img`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: 0.3;
`

const Movie = (props) => {

    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        const getData = async () => {
            let show = props.data.movie === "true" ? "movie" : "tv";
            const link = "https://api.themoviedb.org/3/" + show + "/" +
                props.data.id + "?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US";
            fetch(link).then(response => response.json())
                .then(response => {
                    console.log(response);
                    return response;
                })
                .then(response => setMovieData(response))
        }
        getData();
    }, []);

    return (
        <>
            <div style={{
                "float": "right",
            }}>
                <Button onClick={props.close}><AiFillCloseCircle /></Button>
            </div>
            <div>

            </div>
            {/* <BackdropImage src={"https://image.tmdb.org/t/p/w500/   " + movieData.backdrop_path} /> */}
            <MovieDetails>
                <BackdropImage src={"https://image.tmdb.org/t/p/w500/" + movieData.backdrop_path} />
                <PosterImage src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path} />
                <div>

                    <div>
                        <h2>{movieData.original_title}{movieData.original_name}</h2>
                        <span>{movieData.adult ? "NC-17" : "PG-13"} <GoPrimitiveDot /> </span>
                        <span>
                            {
                                movieData.genres !== undefined ?
                                    movieData.genres.map((curr) => {
                                        return (
                                            <span>{curr.name},</span>
                                        )
                                    }) : null}
                        </span>
                        <p> <AiFillStar color="#f5c518" /> {movieData.vote_average}</p>
                    </div>
                    <div>
                        {/* for Watched buttons and Add to favorite list etc */}
                    </div>
                    <div>
                        <p>{movieData.tagline}</p>
                        <div>
                            <h3>Overview</h3>
                            <p>{movieData.overview}</p>
                        </div>
                    </div>
                </div>
            </MovieDetails>
            <a href={movieData.homepage} >Visit Homepage</a>
        </>
    )
}

export default Movie;