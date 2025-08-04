//the panel that will be shown for each of albums inside AlbumsCadr
//containing list of songs in it

import "./EachAlbumPanel.css";
import {useContext} from "react";
import GlobalContext from "../Contextes.jsx";


function EachAlbumPanel({artistName, albumName}) {
  const {contextState} = useContext(GlobalContext);
  //console.log(`making req to: /artists/${artistName}/${albumName}/cover.jpg`);
  return (
    <div id="each-album-total">
      <div id="album-banner-container">
        <img
          id="album-cover"
          src={`/artists/${artistName}/${albumName}/cover.jpg`}
          alt="album-cover"
        ></img>
        <label id="album-title">{albumName}</label>
      </div>
      <ol id="songs-list">
        {
          contextState.treeState[artistName][albumName].map(
          (song, index) => <li key={index}>#{index}: {song}</li>)
        }
      </ol>
    </div>
  );
}

export default EachAlbumPanel;
