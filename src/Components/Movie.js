import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai"
import { GoPrimitiveDot } from "react-icons/go"
import { AiFillStar } from "react-icons/ai"
import { v4 } from "uuid";


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
    border-radius: 7px;
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
`;

const MovieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2em;
`

const MovieDiv = styled.div`
  width: 240px;
  height: 400px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 95%;
`

const Movie = (props) => {

    const [movieData, setMovieData] = useState({});
    const [recommendations, setRecommendation] = useState([]);

    const getRecommendation = () => {
        let show = props.data.movie === "true" ? "movie" : "tv";
        const link = "https://api.themoviedb.org/3/" + show + "/" + props.data.id +
            "/recommendations?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US&page=1";
        fetch(link).then(response => response.json())
            .then(response => {
                console.log(response);
                return response;
            })
            .then(response => setRecommendation(response.results))
    }

    const MovieOrNot = (obj) => {
        return obj.hasOwnProperty("original_title");
    }

    const onClickHandle = (e) => {
        const movie = e.target.dataset.show;
        const id = e.target.dataset.id;
        props.changeMovie(id, movie);
    }

    useEffect(() => {
        const getData = async () => {
            let show = props.data.movie === "true" ? "movie" : "tv";
            const link = "https://api.themoviedb.org/3/" + show + "/" +
                props.data.id + "?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US";
            fetch(link).then(response => response.json())
                .then(response => setMovieData(response))
        }
        getData();
        getRecommendation();
    }, [props.data.id]);

    return (
        <>
            <div style={{
                "float": "right",
            }}>
                <Button onClick={() => { props.close(false) }}><AiFillCloseCircle /></Button>
            </div>
            <div>
                {console.log(props.data)}
            </div>

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
            <h2>Similar Titles</h2>
            <MovieWrapper>

                {recommendations.length === 0 ? (<h3>Cannot find.</h3>) :
                    recommendations.map((curr) => {
                        const a = MovieOrNot(curr);
                        const imgLink = "https://image.tmdb.org/t/p/w500/";
                        return (
                            <MovieDiv key={v4()}
                                data-show={a}
                                data-id={curr.id}
                                onClick={(e) => onClickHandle(e)}>
                                <Image src={imgLink + curr.poster_path}
                                    data-show={a}
                                    data-id={curr.id} />
                                <p data-show={a}
                                    data-id={curr.id}>{curr.original_title}{curr.original_name}</p>
                                <p data-show={a}
                                    data-id={curr.id}><AiFillStar color="#f5c518" /> {curr.vote_average}</p>
                            </MovieDiv >
                        )
                    })
                }
            </MovieWrapper>
        </>
    )
}

export default Movie;