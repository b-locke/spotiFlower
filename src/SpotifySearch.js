import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import SpotifyDisplay from './SpotifyDisplay';
import DisplayFlowers from './FlowerDisplay';
import "./SpotifySearch.css";

function SpotifySearch( {token} ) {
    console.log(token)
    
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist",
                limit: 1,
                include_external: "audio"
            }
        })

        setArtists(data.artists.items)
    }

return <div>
            <form onSubmit={searchArtists}>
                <input type="text" placeholder="Search..." onChange={e => setSearchKey(e.target.value)}/>
                <button type={"submit"}>Search</button>
            </form>
                <DisplayFlowers artists={artists}/>
       </div>
}

export default SpotifySearch;