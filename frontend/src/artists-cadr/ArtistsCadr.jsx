import {useParams} from 'react-router-dom';

import "./ArtistsCadr.css";
import "../styles/cadr.css";

import ArtistButton from "./ArtistButton.jsx";

function ArtistsCadr({tree, ...rest}) {
  const {chosenArtist} = useParams();
  return (
    <div id="artists-cadr" className="cadr">
      <label id="cadr-title">ARTISTS</label>

      <ul>
        {Object.keys(tree).map((artist) => (
          <li key={artist}>
            <ArtistButton name={artist}
                          {...rest}
                          className={(chosenArtist === artist)? 'active':null}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistsCadr;
