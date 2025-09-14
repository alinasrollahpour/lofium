import { useContext } from "react";
import GlobalContext from "../Contextes";
import "./ArtistButton.css";

function ArtistButton({ name }) {
  const currentContext = useContext(GlobalContext);

  function onClickArtist(artistName) {
    currentContext.setContextState((curr) => {
      return {
        ...curr,
        chosenArtist: artistName,
        chosenAlbum: null,
      };
    });
    console.log(`Artist ${artistName} has been selected!`);
  }

  return (
    <div id="container" onClick={() => onClickArtist(name)}>
      <img
        id="prof"
        src={`artists/${name}/profile.jpg`}
        alt="artist`s profile"
      />
      <label id="artist-name">{name}</label>
    </div>
  );
}

export default ArtistButton;
