//the panel that will be shown for each of albums inside AlbumsCadr
//containing list of songs in it

import "./EachAlbumPanel.css";

function EachAlbumPanel({ artistName, albumName }) {
  console.log(`making req to: /artists/${artistName}/${albumName}/cover.jpg`);
  return (
    <div id="each-album-container">
      <img
        id="album-cover"
        src={`/artists/${artistName}/${albumName}/cover.jpg`}
        alt="album-cover"
      ></img>
      <label id="album-title">{albumName}</label>
    </div>
  );
}

export default EachAlbumPanel;
