import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";

const User = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [login, setLogin] = useState('');
    const [loginPass, setLoginPass] = useState("");
    const [user, setUser] = useState({});

    const register = async () => {
        try {
            const User = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            await setDoc(doc(db, "users", User.user.uid), {
                uid: User.user.uid,
                bio: ""
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const logOut = async () => {
        await signOut(auth);
    }

    const logIn = async (e) => {
        e.preventDefault();
        try {
            const User = await signInWithEmailAndPassword(auth, login, loginPass);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, [])

    const onClickSignUp = (e) => {
        e.preventDefault();
        register();
    }

    return (
        <div>
            <form onSubmit={onClickSignUp}>
                <input type="text" onChange={(e) => { setRegisterEmail(e.target.value) }} placeholder="Email" />
                <input type="text" onChange={(e) => { setRegisterPassword(e.target.value) }} placeholder="password" />
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={logIn}>
                <input type="text" onChange={(e) => { setLogin(e.target.value) }} placeholder="Email" />
                <input type="text" onChange={(e) => { setLoginPass(e.target.value) }} placeholder="password" />
                <button type="submit">Submit</button>
            </form>
            {user?.email}

            <button onClick={logOut}>Sign Out</button>
        </div>
    )
}

export default User;