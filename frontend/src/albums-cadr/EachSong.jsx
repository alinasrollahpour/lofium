
import {useNavigate, useParams} from 'react-router-dom';
import './EachSong.css'

function EachSong({artistName, albumName, songName, index}) {
  const navigate = useNavigate();
  //const {artist, album} = useParams();
  //const {contextState, setContextState} = useContext(GlobalContext);

  function handleSongClick() {
    //redirect to that URL of this song
    navigate(`/${artistName}/${albumName}/${songName}`);
  }
  return <button id="song-container" onClick={handleSongClick}>
    <label id="song-index">{index}</label>
    {songName}
  </button>
}
export default EachSong;