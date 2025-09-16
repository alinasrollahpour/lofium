/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import "./index.css";
import "./App.css";

import Banner from "./Banner";
import ArtistsCadr from "./artists-cadr/ArtistsCadr";
import PlayBox from "./play-box/PlayBox";
import ErrorBoundary from "./ErrorBoundary.jsx";
import AlbumsCadr from "./albums-cadr/AlbumsCadr.jsx";
import PlayBoxDemo from "./play-box/PlayBoxDemo.jsx";

//the port that backend is listening
const PORT = 3001;


function App() {

  //we have two states for App.js
  const [tree, setTree] = useState({});
  const {artist, album, song} = useParams();

  //log the tree
  useEffect(() => console.dir(tree), [tree]);
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
    <div id="frame">
      {/*<PlayBox/>*/}
      <PlayBoxDemo/>
      <div id="up-area">
        <div id="left-bar">
          <Banner/>
          <ArtistsCadr tree={tree}/>
        </div>
        <div id="middle-bar">
          <div id="middle-cadr">
            {artist ? (
              <AlbumsCadr artistName={artist} tree={tree}/>
            ) : (
              <label>Select an artist to see albums.</label>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
