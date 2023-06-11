import './App.css';
import SpotifyLogin from './SpotifyLogin';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon } from 'react-share';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Spotifleurs
      </header>
      <body>
        <SpotifyLogin/>
      </body>
      <FacebookShareButton
          url={'https://www.example.com'}
          quote={'Dummy text!'}
          hashtag="#muo">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
          url={'https://www.example.com'}
          quote={'Dummy text!'}
          hashtag="#muo">
          <TwitterIcon size={32} round />
      </TwitterShareButton>
      <RedditShareButton
          url={'https://www.example.com'}
          quote={'Dummy text!'}
          hashtag="#muo">
          <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
}

export default App;
