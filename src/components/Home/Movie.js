import { addDoc, collection, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase-config"

const ReviewDiv = styled.div`
    overflow: scroll;
`

const Movie = (props) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState([]);

    const AddToWatched = async () => {
        try {
            await addDoc(collection(db, "users", auth.currentUser.uid, "Watched"), {
                id: props.data.id,
            })
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const RateMovie = async (e) => {
        try {
            e.preventDefault();
            await fetch("https://api.themoviedb.org/3/movie/" + props.data.id + "/rating?api_key=" +
                process.env.REACT_APP_MOVIE_DB)
                .then(response => console.log(response))
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const AddReview = async () => {
        try {
            const ref = collection(db, "user", auth.currentUser.uid, "Watched");
            const q = query(ref, where("id", "==", props.data.id))
            const data = await getDocs(q);
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getReview = async () => {
        try {
            await fetch("https://api.themoviedb.org/3/movie/"
                + props.data.id + "/reviews?api_key=" + process.env.REACT_APP_MOVIE_DB + "&language=en-US&page=1")
                .then(response => response.json())
                .then(response => setReview(response.results))
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <ReviewDiv>
            <p>{props.data?.title}{props.data?.name}</p>
            <p>{props.data.vote_average}</p>
            {auth.currentUser === null ? null :
                <div>
                    <button onClick={AddToWatched}>Watched</button>
                    <form onSubmit={RateMovie}>
                        <input type="number" min="1" max="10"
                            required onChange={(e) => { setRating(e.target.value) }} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            }
            {AddReview()}
        </ReviewDiv>
    )
};

export default Movie;