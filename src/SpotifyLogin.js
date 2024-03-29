import React from 'react';
import {useEffect, useState} from 'react';
import SpotifySearch from './SpotifySearch';
import "./SpotifyLogin.scss"

const CLIENT_ID = "1598f1064b0c442ca757385e4dd513e8" 
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function SpotifyLogin() {

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)

    
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return <div> 
                {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> 
                : <body><SpotifySearch token={token}/> <button onClick={logout}>Logout</button> </body>}
           </div>

}
export default SpotifyLogin;