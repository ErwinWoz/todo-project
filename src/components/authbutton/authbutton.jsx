import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./authbutton.module.scss";
// require('dotenv').config();

const client_id = process.env.REACT_APP_CLIENT_ID;
const scope = process.env.REACT_APP_SCOPE;
const state = process.env.REACT_APP_SECRET_STRING;

export const Authbutton = () => {
  let navigate = useNavigate();

  // url and params for getting unique 'code' string
  const baseUrl = new URL("https://todoist.com/oauth/authorize");
  baseUrl.searchParams.set("client_id", client_id);
  baseUrl.searchParams.set("scope", scope);
  baseUrl.searchParams.set("state", state);

  // redirect to authorization url to get 'code' string
  const redirectUrl = () => {
    window.location.href = baseUrl;
    console.log(baseUrl.href);
    alert('Click "Access todolist" after page reload');
  };

  useEffect(() => {
    // additional params from redirected url
    let params = new URLSearchParams(document.location.search);
    let code = params.get("code");
    let newState = params.get("state");

    if (code) {
      requestAccessToken();
    }

    async function requestAccessToken() {
      const accessTokenUrl = new URL("https://todoist.com/oauth/access_token");

      const postParams = {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: newState,
        code: code,
      };

      const response = await fetch(accessTokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postParams),
      });
      const data = await response.json();
      console.log(data);

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("tokenType", data.token_type);

      navigate("/list");

      params.delete("code");
      params.delete("state");
      window.location.search = params;
    }
  }, []);

  return (
    <div className={style.authContainer}>
      <h1>Welcome to todolist-project!</h1>
      <button className={style.button} onClick={redirectUrl}>
        <span>Redirect for permission</span>
      </button>
    </div>
  );
};
