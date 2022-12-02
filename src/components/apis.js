import React, { useEffect, useState } from "react";

const apis = () => {

    const [animeList, setAnimeList] = useState([]);
    const [image, setImage] = useState("");

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_ANIME_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_ANIME_HOST,
        }
    };

    useEffect(() => {
        const getAnimeList = async (size, sort, order) => {
            fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc', options)
                .then(response => response.json())
                .then(response => setAnimeList(response.data))
                .catch(err => console.error(err));
        }

        getAnimeList('10', 'ranking', 'asc')
    }, [])

    useEffect(() => {
        const getMovie = async () => {
            const key = process.env.REACT_APP_MOVIE_DB;
            fetch("https://api.themoviedb.org/3/movie/550?api_key=" + key)
                .then(response => response.json())
                .then(response => setImage("https://image.tmdb.org/t/p/w500" + response.poster_path))
                .catch(err => console.log(err))
        }
        getMovie();
    }, [])


    return (
        <div>
            {animeList.map((curr) => {
                return (
                    <div>
                        <img src={curr.image} />
                    </div>
                )
            })}
            {image !== "" && (
                <img src={image} />
            )}
        </div>
    )
}

export default apis;