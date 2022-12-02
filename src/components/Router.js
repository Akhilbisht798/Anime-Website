import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Rated from "./Home/Rated";
import Trending from "./Home/trending";
import Genre from "./Home/genre";

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Trending />} />
                <Route path="/rated" element={<Rated />} />
                <Route path="/genre" element={<Genre />} />
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;