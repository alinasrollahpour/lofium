import { albums } from "../../data.js";
import "./AlbumsCadr.css";
import EachAlbumPanel from "./EachAlbumPanel.jsx";


function AlbumsCadr({ artistName }) {
  let listOfAlbums = albums[artistName];
  if (listOfAlbums === undefined) {
    console.log();
    return <>{`Artist ${artistName} not found!`}</>;
  }

  return (
    <div id="albums-cadr">
      <div id="artist-banner">
        <label id="artist-title">{artistName}</label>
        <div id="dimmer" />
        <img
          id="banner-img"
          src={`artists/${artistName}/profile.jpg`}
          alt="artist-banner"
        ></img>
      </div>

      <ol>
        {listOfAlbums.map((albumName, index) => (
          <li key={index}>
            <EachAlbumPanel artistName={artistName} albumName={albumName}/>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AlbumsCadr;
