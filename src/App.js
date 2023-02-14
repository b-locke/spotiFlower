import './App.css';
import SpotifyLogin from './SpotifyLogin';
import DisplayFlowers from './Flowers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <SpotifyLogin/>
      </header>
      <div>
          <DisplayFlowers/>
      </div>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 L37.5 75 C0 150 72.5 150 75 112.5 C75 150 150 150 112.5 75 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C120 80 72.5 150 75 112.5 C75 150 150 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C0 100 72.5 150 75 112.5 C75 150 150 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C20 100 72.5 150 75 112.5 C75 150 130 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C20 100 72.5 150 75 150 C75 150 130 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C50 100 72.5 150 55 150 C75 150 100 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C50 100 72.5 153 80 150 C55 130 120 40 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C20 100 68 125 75 130 C55 95 95 100 77 160 C77 160 140 100 75 0 Z" />
      </svg>
      <svg height="300" width="300" stroke="black" fill="white" stroke-opacity="0.8" stroke-width="3">
        <path d="M75 0 C20 100 73 160 73 160 C45 110 105 110 77 160 C77 160 130 100 75 0 Z" />
      </svg>
    </div>
  );
}

export default App;
