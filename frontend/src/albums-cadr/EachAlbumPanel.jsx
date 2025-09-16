//the panel that will be shown for each of albums inside AlbumsCadr
//containing list of songs in it

import "./EachAlbumPanel.css";
import {useParams} from "react-router-dom";
import EachSong from "./EachSong.jsx";

const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;


function EachAlbumPanel({artistName, albumName, tree}) {
  //const {artist , album} = useParams();
  return (
    <div id="each-album-total">
      <div id="album-banner-container">
        <img
          id="album-cover"
          src={`${backendDomain}/lib/${artistName}/${albumName}/cover.jpg`}
          alt="album-cover"
        ></img>
        <label id="album-title">{albumName}</label>
      </div>
      <ol id="songs-list">
        {
          tree[artistName][albumName].map(
            (song, index) => {
              //if '.jpg' is not in song
              if (!song.includes('.jpg')) {
                return (<li key={index}>
                  <EachSong artistName={artistName} albumName={albumName} songName={song} index={index}/>
                </li>)
              }
            }
          )
        }
      </ol>
    </div>
  );
}

export default EachAlbumPanel;
