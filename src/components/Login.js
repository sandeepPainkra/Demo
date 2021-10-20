import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://wallpapercave.com/wp/wp6559480.png"
          alt="whatsapp-logo"
        />
        <h2>Sign in to WhatsApp</h2>
        <Button onClick={SignIn}>SIGN IN WITH GOOGLE</Button>
      </div>
    </div>
  );
};

export default Login;
