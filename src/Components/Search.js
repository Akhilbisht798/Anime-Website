import React, { useState } from "react";
import Movie from "./Movie";
import styled from "styled-components";
import { AiFillStar, AiFillHome } from "react-icons/ai"
import { v4 } from "uuid";

const MovieWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2em;
  padding: 15px;
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

const Search = (props) => {

    const [openMovie, setOpenMovie] = useState(() => false);
    const [selectedMovie, setSelectedMovie] = useState({})

    const MovieOrNot = (obj) => {
        return obj.hasOwnProperty("original_title");
    }

    const changeSelectedMovie = (id, show) => {
        setSelectedMovie({ id: id, movie: show })
    }

    const closeMovie = (bool) => {
        setOpenMovie(bool);
    }

    const onClickHandle = (e) => {
        const movie = e.target.dataset.show;
        const id = e.target.dataset.id;
        setSelectedMovie({ id: id, movie: movie });
        setOpenMovie(true);
    }

    return (
        <>
            <AiFillHome onClick={props.close} size="20" cursor="pointer" />
            {!openMovie ?
                <MovieWrapper>
                    {props.data.map((curr) => {
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
                    })}
                </MovieWrapper> :
                <Movie data={selectedMovie} close={closeMovie} changeMovie={changeSelectedMovie} />
            }
        </>
    )
}

export default Search;