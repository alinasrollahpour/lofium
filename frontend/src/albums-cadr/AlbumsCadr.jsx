import {useParams, useNavigate} from "react-router-dom";
import "./AlbumsCadr.css";
import EachAlbumPanel from "./EachAlbumPanel.jsx";

const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;

function AlbumsCadr({artistName, tree}) {
  //get the params
  const {artist} = useParams();
  const navigate = useNavigate();

  if (Object.keys(tree).length === 0 || !artistName) {
    navigate('/');
    return;
  }
  return (
    <div id="albums-cadr" className="scroll-dark">
      <div id="scrolling-container">
        <div id="artist-banner">
          <label id="artist-title">{artist}</label>
          <div id="dimmer"/>
          <img
            id="banner-img"
            src={`${backendDomain}/lib/${artist}/profile.jpg`}
            alt="artist-banner"
          ></img>
        </div>

        <ol id="list-of-albums">
          {Object.keys(tree[artistName]).map((albumName, index) => (
            <li key={index}>
              <EachAlbumPanel
                artistName={artistName} albumName={albumName} tree={tree}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default AlbumsCadr;
