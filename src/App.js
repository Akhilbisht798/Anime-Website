import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import Search from "./Components/Search";
import User from "./Components/UserAuth";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth"

const App = () => {

  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(() => false);
  const [searchRes, setSearchRes] = useState([]);
  const [user, setUser] = useState(() => false);

  const searchMovie = async () => {
    const link = "https://api.themoviedb.org/3/search/multi?api_key=" + process.env.REACT_APP_MOVIE_DB +
      "&language=en-US&query=" + search + "&page=1&include_adult=true";
    fetch(link).then(response => response.json())
      .then(response => setSearchRes(response.results))
  }

  const closeSearch = () => {
    setOpenSearch(false);
  }

  const onSearchHandle = async (e) => {
    e.preventDefault();
    searchMovie();
    setOpenSearch(true);
  }

  const changeUser = (bool) => {
    setUser(bool);
  }

  const logOut = async () => {
    await signOut(auth);
  }

  return (
    <>
      <div>
        <form onSubmit={(e) => { onSearchHandle(e) }}>
          <input type="text" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} required />
          <button type="submit">Submit</button>
        </form>
        {!user ? <User changeUser={changeUser} /> :
          <div>
            {auth.currentUser?.email}
            <button onClick={logOut} >Log Out</button>
          </div>}
      </div>
      {openSearch ? <Search data={searchRes} close={closeSearch} /> :
        <Home />
      }
    </>
  )
}

export default App;