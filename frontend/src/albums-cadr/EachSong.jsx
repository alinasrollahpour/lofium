import './EachSong.css'
import {useContext} from "react";
import GlobalContext from "../Contextes.jsx";

function EachSong({artistName, albumName, songName, index}) {
  const {contextState, setContextState} = useContext(GlobalContext);

  function handleSongClick() {
    // console.log('handleSongClick got clicked!')
    // setTimeout(()=> {
    //   console.log(`three values passed to EachSong: ${artistName} ${albumName} ${songName}`)
    //   console.log('the updated value of contextState');
    //   console.dir(contextState);
    // }, 20)

    setContextState((prevState) => (
      {
        ...prevState,
        chosenArtist: artistName,
        chosenAlbum: albumName,
        playingSong: songName,
      }
    ));
  }
  return <button id="song-container" onClick={handleSongClick}>
    <label id="song-index">{index}</label>
    {songName}
  </button>
}
export default EachSong;