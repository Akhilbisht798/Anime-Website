import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from "uuid";
import { AiFillStar } from "react-icons/ai"
import { ScaleLoader } from "react-spinners"
import Movie from "./Movie";

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


const Home = () => {

    const [trendingList, setTrendingList] = useState([]);
    const [currPage, setCurrpage] = useState(() => 1);
    const [totalResults, setTotalResults] = useState(() => 0)
    const [openMovie, setOpenMovie] = useState(() => false);
    const [selectedMovie, setSelectedMovie] = useState({})

    const getTrending = async (pageParam = 1) => [
        fetch("https://api.themoviedb.org/3/trending/all/day?api_key=" + process.env.REACT_APP_MOVIE_DB
            + "&page=" + pageParam)
            .then(response => response.json())

            .then(response => {
                let array = trendingList.concat(response.results)
                setTrendingList(array);
                if (pageParam === 1) setTotalResults(response.total_results);
            })
    ]

    const fetchMoreData = () => {
        getTrending(currPage + 1);
        setCurrpage(currPage + 1);
    }

    const MovieOrNot = (obj) => {
        return obj.hasOwnProperty("original_title");
    }

    const changeSelectedMovie = (id, show) => {
        setSelectedMovie({ id: id, movie: show })
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

    useEffect(() => {
        getTrending(1);
    }, [])

    return (
        <div>
            {!openMovie ?
                <InfiniteScroll
                    dataLength={trendingList.length}
                    next={fetchMoreData}
                    hasMore={totalResults !== trendingList.length}
                    loader={<div style={{ textAlign: 'center' }} ><ScaleLoader /></div>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <MovieWrapper>
                        {trendingList.map((curr) => {
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
                    </MovieWrapper>
                </InfiniteScroll> :
                <Movie data={selectedMovie} close={closeMovie} changeMovie={changeSelectedMovie} />
            }
        </div>
    )
}

export default Home;