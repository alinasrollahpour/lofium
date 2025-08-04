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
import PlayBoxDemo from "./play-box/PlayBoxDemo.jsx";

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
            let res = await fetch(
              `http://localhost:${PORT}/api/list-files/${artist}/${album}`
            )
            if(!res.ok) { throw new Error(`Unable to fetch songs, http ${res.status}`); }

            let {files} = await res.json();
            console.log(`just fetched ${artist}/${album}, the response: ${files}`);
            //add fetchedSongs to new tree
            songsIncludedTree[artist][album] = files;
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
    </GlobalContext>
  );
}

export default App;
