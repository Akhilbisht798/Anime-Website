import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import Search from "./Components/Search";
import User from "./Components/UserAuth";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth"
import styled from "styled-components";
import "./app.css"
import { BiLogOut } from "react-icons/bi"

const Header = styled.div`
  background-color: #222;
  margin-bottom: 15px;
  color: #eee;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px;
`

const Form = styled.form`
  width: 50%;
`

const Input = styled.input`
    background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 50%;
`

const Button = styled.button`
    background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 30px;
  margin-top: 18px;
  // outline: 0;
  text-align: center;
  width: 20%;
  margin-left: 10px;
`

const Header2Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2em;
`

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
      <Header>
        <Form onSubmit={(e) => { onSearchHandle(e) }}>
          <Input type="text" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} required />
          <Button type="submit">Submit</Button>
        </Form>
        {!user ? <User changeUser={changeUser} /> :
          <Header2Div>
            <p>{auth.currentUser?.email}</p>
            <BiLogOut onClick={logOut} cursor="pointer" />
          </Header2Div>}
      </Header>
      {openSearch ? <Search data={searchRes} close={closeSearch} /> :
        <Home />
      }
    </>
  )
}

export default App;