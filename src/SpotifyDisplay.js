import React from 'react';

function SpotifyDisplay( {artists} ) {

    console.log(artists)
    let display = "search for an artist";

    if (artists.length > 0) {
        display = artists[0].name;
    }

    return  <div>
                {display}
            </div>
}

export default SpotifyDisplay;