import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Rated from "./Home/Rated";
import Trending from "./Home/trending";
import Genre from "./Home/genre";

const ReactRouter = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Trending selectedMovie={props.selectedMovie} />} />
                <Route path="/rated" element={<Rated selectedMovie={props.selectedMovie} />} />
                <Route path="/genre" element={<Genre selectedMovie={props.selectedMovie} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;