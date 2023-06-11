import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import SpotifyDisplay from './SpotifyDisplay';
import TrackSearchDisplay from './TrackSearchDisplay';

function SpotifyTrackSearch( {token} ) {
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
                type: "track",
                limit: 10,
                include_external: "audio"
            }
        })

        setArtists(data.tracks.items)
    }

return <div>
        <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
       </form>
       <TrackSearchDisplay artists={artists}/>
       </div>
}

export default SpotifyTrackSearch;