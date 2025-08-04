/* eslint-disable no-unused-vars */
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

const PORT = 3001;

function App() {
  const [contextState, setContextState] = useState({
    treeState: tree,
    chosenArtist: null,
    chosenAlbum: null,
    playingSong: null,
    areSongsLoaded: false
  });
  useEffect(() => {
    console.log('useEffect started executing...');
    //fetch the list of songs
    async function fetchSongs() {
      let songsIncludedTree = contextState.treeState;
      for (const artist in contextState.treeState) {
        for (const album in contextState.treeState[artist]) {
          //to fetch /artist/album
          try {
            let fetchedSongs = await fetch(
              `http://localhost:${PORT}/api/list-files/${artist}/${album}`
            )
            console.log(`just fetched ${artist}/${album}, the songs: ${fetchedSongs}`);
            //add fetchedSongs to new tree
            songsIncludedTree[artist][album] = fetchedSongs;
          } catch (err) {
            console.error('i failed to fetch songs from backend: ' + err);
          }
        }
      }
      //update the global state
      setContextState((oldState) => {
          return {...oldState, treeState: songsIncludedTree, areSongsLoaded: true}
        }
      )
    }
    fetchSongs();
  }, [])

  const currentContext = useContext(GlobalContext);

  return (
    <GlobalContext value={{contextState, setContextState}}>
      <div id="frame">
        <PlayBox/>
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
    </GlobalContext>
  );
}

export default App;
