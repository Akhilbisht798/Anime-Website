import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai"
import { GoPrimitiveDot } from "react-icons/go"
import { AiFillStar, AiFillEyeInvisible } from "react-icons/ai"
import { v4 } from "uuid";
import { BsFillEyeFill } from "react-icons/bs"
import { auth, db } from "../firebase-config"
import { collection, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore"
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";

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
    margin: 10px;
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
  margin: 13px;
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
    const [watched, setWatched] = useState(() => false);
    const [isRecommended, setIsRecommended] = useState(() => false);

    const getRecommendation = () => {
        let show = props.data.movie === "true" ? "movie" : "tv";
        const link = "https://api.themoviedb.org/3/" + show + "/" + props.data.id +
            "/recommendations?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US&page=1";
        fetch(link).then(response => response.json())
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

    const hasWatched = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid, "Watched", props.data.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setWatched(true);
            return;
        }
        setWatched(false);
    }

    const addToWatched = async () => {
        try {
            const Watched = collection(db, "users", auth.currentUser.uid, "Watched");
            await setDoc(doc(Watched, props.data.id), {
                id: props.data.id,
                show: props.data.movie == "true" ? true : false
            });
            setWatched(true);
        } catch (error) {
            console.log(error);
        }
    }

    const removeWatched = async () => {
        try {
            await deleteDoc(doc(db, "users", auth.currentUser.uid, "Watched", props.data.id));
            setWatched(false);
        } catch (error) {
            console.log(error);
        }
    }

    const AddToRecommend = async () => {
        try {
            const Recommend = collection(db, "users", auth.currentUser.uid, "Recommend");
            await setDoc(doc(Recommend, props.data.id), {
                id: props.data.id,
                show: props.data.movie == "true" ? true : false
            });
            setIsRecommended(true);
        } catch (error) {
            console.log(error);
        }
    }

    const RemoveFromRecommend = async () => {
        try {
            await deleteDoc(doc(db, "users", auth.currentUser.uid, "Recommend", props.data.id));
            setIsRecommended(false);
        } catch (error) {
            console.log(error);
        }
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
        hasWatched();
    }, [props.data.id]);

    return (
        <>
            <div style={{
                "float": "right",
            }}>
                <Button onClick={() => { props.close(false) }}><AiFillCloseCircle size="20" /></Button>
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
                        {watched ? < BsFillEyeFill cursor="pointer" onClick={removeWatched} /> :

                            <AiFillEyeInvisible cursor="pointer" onClick={addToWatched} />
                        }
                        {isRecommended ? <IoMdAddCircle cursor="pointer" onClick={RemoveFromRecommend} /> :
                            <IoMdAdd cursor="pointer" onClick={AddToRecommend} />
                        }
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