import React, { useEffect, useState } from "react";

const Genre = () => {

    const [genres, setGenres] = useState([])

    useEffect(() => {
        const getGenre = async () => {

            const Link = "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
                process.env.REACT_APP_MOVIE_DB + "&language=en-US";

            fetch(Link).then(response => response.json())
                .then(response => setGenres(response.genres))
        }

        getGenre();
    }, [])

    return (
        <div>
            {genres.map((curr) => {
                return (
                    <div key={curr.id}>
                        {curr.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genre;