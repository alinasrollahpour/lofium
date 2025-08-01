import { useState } from 'react'
import './index.css'
import './App.css'

import Banner from './Banner'
import ArtistsCadr from './artists-cadr/ArtistsCadr'
import PlayBox from './play-box/PlayBox'
import ErrorBoundary from './ErrorBoundary.jsx'

function App() {
  const [chosenArtist, setChosenArtist] = useState(null);
  const [chosenAlbum, setChosenAlbum] = useState(null);

  //when user clicks an Artist in ArtistsCadr
  function onClickArtist(artistName) {
    setChosenArtist(artistName)
    console.log(`Artist ${artistName} has been selected!`);
    
  }

  return (
    <ErrorBoundary>
      <div id='frame' >
      <div id='left-bar'>
        <Banner/>
        <ArtistsCadr onClickArtist={onClickArtist}/>
      </div>
      <div id='middle-bar'>
        <PlayBox/>
        <div id='middle-cadr' chosenArtist={chosenArtist} chosenAlbum={chosenAlbum}>
          {
            /*can be 'AlbumsCadr' 'SongsCadr' or nothing*/
            chosenArtist ? (
              chosenAlbum ? <SongsCadr/> : <AlbumsCadr/>
              // <label>Artist : {chosenArtist} is selected</label>
            ):
            (<label>Select an artist to see albums.</label>)
          }
        </div> 
        
      
      </div>
    </div>
    </ErrorBoundary>
  )
}

export default App
