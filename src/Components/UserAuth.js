import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase-config";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FormDiv = styled.div`
    width: 40%;
    height: 90%;
    background-color: #15172b;;
    border-radius: 20px;
    color: #eee;
    padding: 0.6em;
    @media (max-width: 820px) {
        width: 100%;
        height: 100%;
    }
`

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.2em;
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
    width: 70%;
    @media (max-width: 820px) {
          width: 100%;
          height: 100%;
      }
`

const SubmitButton = styled.button`
    background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 40px;
  margin-top: 18px;
  // outline: 0;
  text-align: center;
  width: 30%;
`

const User = (props) => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [login, setLogin] = useState('');
    const [loginPass, setLoginPass] = useState("");

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
            if (currentUser) {
                props.changeUser(true);
            } else {
                props.changeUser(false);
            }
        })
    }, [])

    const onClickSignUp = (e) => {
        e.preventDefault();
        register();
    }

    return (
        <Overlay>
            <FormDiv>
                <h1>Welcome</h1>
                <h3>Please Sign-Up or Log-In First.</h3>
                <h2>Sign-Up</h2>
                <Form onSubmit={onClickSignUp}>
                    <Input type="email" onChange={(e) => { setRegisterEmail(e.target.value) }}
                        placeholder="Enter a Valid Email" />
                    <Input type="password" onChange={(e) => { setRegisterPassword(e.target.value) }}
                        placeholder="Use Strong Password" />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>

                <h2>Log-In</h2>
                <Form onSubmit={logIn}>
                    <Input type="email" onChange={(e) => { setLogin(e.target.value) }}
                        placeholder="Enter your Email" />

                    <Input type="password" onChange={(e) => { setLoginPass(e.target.value) }}
                        placeholder="Enter your Password" />
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Form>
            </FormDiv>
        </Overlay>
    )
}

export default User;