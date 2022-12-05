import React, { useState } from "react";
import styled from "styled-components";

const MovieWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2em;
`

const MovieDiv = styled.div`
  width: 240px;
  height: 300px;
  border: 2px solid black;
`


const App = () => {

  const [trendingList, setTrendingList] = useState([]);
  const [currPage, setCurrpage] = useState(1);

  const getTrending = async (pageParam = 1) => [
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=" + process.env.REACT_APP_MOVIE_DB
      + "&page=" + pageParam)
      .then(response => response.json())

      .then(response => {
        let array = trendingList.concat(response.results)
        setTrendingList(array);
      })
  ]

  const onClick = () => {
    getTrending(currPage);
    setCurrpage(currPage + 1);
  }

  const MovieOrNot = (obj) => {
    return obj.hasOwnProperty("original_title");
  }

  return (
    <div>
      <h1>Trending</h1>
      {console.log(trendingList)}
      <button onClick={() => { onClick() }}>GEt Trending</button>
      <MovieWrapper>
        {trendingList.map((curr) => {
          const a = MovieOrNot(curr);
          return (
            <MovieDiv key={curr.id}
              data-show={a}
              data-id={curr.id}>
              <p>{curr.original_title}{curr.original_name}</p>
            </MovieDiv>
          )
        })}
      </MovieWrapper>
    </div>
  )
}

export default App;