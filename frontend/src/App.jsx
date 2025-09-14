/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Route, useParams} from 'react-router-dom'
import {useContext, useEffect, useState} from "react";
import "./index.css";
import "./App.css";

import {tree} from "../data.js";

import GlobalContext from "./Contextes.jsx";

import Banner from "./Banner";
import ArtistsCadr from "./artists-cadr/ArtistsCadr";
import PlayBox from "./play-box/PlayBox";
import ErrorBoundary from "./ErrorBoundary.jsx";
import AlbumsCadr from "./albums-cadr/AlbumsCadr.jsx";
import PlayBoxDemo from "./play-box/PlayBoxDemo.jsx";

//the port that backend is listening
const PORT = 3001;


function App() {
  // const [contextState, setContextState] = useState({
  //   treeState: tree,
  //   chosenArtist: null,
  //   chosenAlbum: null,
  //   playingSong: null,
  //   areSongsLoaded: false
  // });

  //we have two states for App.js
  const[tree, setTree] = useState({});
  const {artist, album, song} = useParams();

  console.log(`fetched these params: ${artist}, ${album}, ${song}`);
  //just do Fetching songs one time
  useEffect(() => {
    //fetch the tree
    async function fetchSongs() {
      const fetched = await fetch(`http://localhost:${PORT}/api/tree`);
      const data = await fetched.json();
      console.log('fetched this tree:');
      console.dir(data);
      setTree(data);

    }

    //call this function
    fetchSongs().then(r => console.log("Songs have been fetched..."));
  }, [])


  return (
    <Router>
      <Route path='/:artist/:album/:song' element={
        <div id="frame">
          {/*<PlayBox/>*/}
          <PlayBoxDemo/>
          <div id="up-area">
            <div id="left-bar">
              <Banner/>
              <ArtistsCadr/>
            </div>
            <div id="middle-bar">
              <div id="middle-cadr">
                {contextState.chosenArtist ? (
                  <AlbumsCadr artistName={contextState.chosenArtist}/>
                ) : (
                  <label>Select an artist to see albums.</label>
                )}
              </div>
            </div>
          </div>
        </div>
      }/>
    </Router>
  );
}

export default App;
