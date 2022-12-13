import React, { useEffect, useState, useReducer } from "react";
import { auth, db } from "../firebase-config"
import { AiFillCloseCircle } from "react-icons/ai"
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { v4 } from "uuid";
import { AiFillStar } from "react-icons/ai"
import Movie from "./Movie";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

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

const queryClient = new QueryClient();

export default function UserPage(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Inner close={props.close} />
        </QueryClientProvider>
    )
}

const Inner = (props) => {

    const [watched, setWatched] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({})
    const [openMovie, setOpenMovie] = useState(() => false);

    const getData = (link) => {
        return new Promise((resolve, reject) => {
            fetch(link).then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    const getWatched = async () => {
        try {
            const snapShot = await getDocs(collection(db, "users", auth.currentUser.uid, "Watched"));
            let arr = [];
            snapShot.forEach((doc) => {
                arr.push(doc.data());
            })
            let w = [];
            arr.forEach((obj) => {
                let show = obj.show ? "movie" : "tv";
                const link = "https://api.themoviedb.org/3/" + show + "/" +
                    obj.id + "?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US";
                w.push(getData(link));
            });
            Promise.all(w)
                .then(results => {
                    setWatched(results);
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }

    const { isError, isSuccess, isLoading, data, error } = useQuery(
        ["movies"],
        getWatched,
    );

    const MovieOrNot = (obj) => {
        return obj.hasOwnProperty("original_title");
    }

    const onClickHandle = (e) => {
        const movie = e.target.dataset.show;
        const id = e.target.dataset.id;
        setSelectedMovie({ id: id, movie: movie });
        setOpenMovie(true);
    }

    const closeMovie = (bool) => {
        setOpenMovie(bool);
    }

    const changeSelectedMovie = (id, show) => {
        setSelectedMovie({ id: id, movie: show })
    }

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (isError) {
        return (<div>Error...</div>)
    }

    return (
        <>
            <div style={{
                "float": "right",
            }}>
                <AiFillCloseCircle onClick={props.close} size="20" cursor="pointer" />
            </div>
            {openMovie ? <Movie data={selectedMovie} close={closeMovie} changeMovie={changeSelectedMovie} /> :
                <>
                    <h2>Watched</h2>
                    {
                        <MovieWrapper>
                            {
                                watched.map((curr) => {
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
                    }
                </>
            }
        </>
    )
}