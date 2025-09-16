import "./ArtistButton.css";
import {useNavigate} from "react-router-dom";

const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN //"http://localhost:3001";

function ArtistButton({ name }) {
  const navigate = useNavigate();

  function onClickArtist(artistName) {
    //when user clicks the artist, should redirect the URL to that artist
    //navigate to that artist
    navigate(`/${artistName}`);

    console.log(`Artist ${artistName} has been selected!`);
  }

  return (
    <div id="container" onClick={() => onClickArtist(name)}>
      <img
        id="prof"
        src={`${backendDomain}/lib/${name}/profile.jpg`}
        alt="artist`s profile"
      />
      <label id="artist-name">{name}</label>
    </div>
  );
}

export default ArtistButton;
