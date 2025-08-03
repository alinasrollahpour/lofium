import { useContext } from "react";
import GlobalContext from "../Contextes.jsx";
import "./ArtistsCadr.css";
import "../styles/cadr.css";

import ArtistButton from "./ArtistButton.jsx";

function ArtistsCadr(prop) {
  const currentContext = useContext(GlobalContext).contextState;
  const artists = currentContext.treeState;
  return (
    <div id="artists-cadr" className="cadr">
      <label id="cadr-title">ARTISTS</label>

      <ul>
        {Object.keys(artists).map((artist) => (
          <li key={artist}>
            <ArtistButton name={artist} {...prop} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistsCadr;
