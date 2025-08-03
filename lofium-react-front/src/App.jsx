/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import "./index.css";
import "./App.css";

import { tree } from "../data.js";

import GlobalContext from "./Contextes.jsx";

import Banner from "./Banner";
import ArtistsCadr from "./artists-cadr/ArtistsCadr";
import PlayBox from "./play-box/PlayBox";
import ErrorBoundary from "./ErrorBoundary.jsx";
import AlbumsCadr from "./albums-cadr/AlbumsCadr.jsx";

function App() {
  const [contextState, setContextState] = useState({
    treeState: tree,
    chosenArtist: null,
    chosenAlbum: null,
    playingSong: null
  });

  // const [treeState, setTreeState] = useState(tree);
  // const [chosenArtist, setChosenArtist] = useState(null);
  // const [chosenAlbum, setChosenAlbum] = useState(null);
  // const [playingSong, setPlayingSong] = useState(null);

  const currentContext = useContext(GlobalContext);
  //when user clicks an Artist in ArtistsCadr

  return (
    <GlobalContext value={{ contextState, setContextState }}>
      <div id="frame">
        <PlayBox />
        <div id="up-area">
          <div id="left-bar">
            <Banner />
            <ArtistsCadr />
          </div>
          <div id="middle-bar">
            <div id="middle-cadr">
              {contextState.chosenArtist ? (
                <AlbumsCadr artistName={contextState.chosenArtist} />
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
