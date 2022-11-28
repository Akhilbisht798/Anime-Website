import React, { useEffect, useState } from "react";

const Home = () => {

    const [animeList, setAnimeList] = useState([]);

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


    return (
        <div>
            {console.log(animeList)}
            {animeList.map((curr) => {
                return (
                    <div>
                        <img src={curr.image} />
                    </div>
                )
            })}
        </div>
    )
}

export default Home;