import { useContext } from "react";
import GlobalContext from "../Contextes.jsx";
import "./AlbumsCadr.css";
import EachAlbumPanel from "./EachAlbumPanel.jsx";


function AlbumsCadr({ artistName }) {
  let {contextState, setContextState} = useContext(GlobalContext);

  let setOfAlbums = contextState.treeState[contextState.chosenArtist];
  if (setOfAlbums === undefined) {
    return <>{`Artist ${artistName} not found!`}</>;
  }

  return (
    <div id="albums-cadr" className="scroll-dark">
      <div id="scrolling-container">
        <div id="artist-banner">
          <label id="artist-title">{artistName}</label>
          <div id="dimmer" />
          <img
            id="banner-img"
            src={`artists/${artistName}/profile.jpg`}
            alt="artist-banner"
          ></img>
        </div>

        <ol id="list-of-albums">
          {Object.keys(setOfAlbums).map((albumName, index) => (
            <li key={index}>
              <EachAlbumPanel artistName={artistName} albumName={albumName}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default AlbumsCadr;
