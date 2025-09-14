import {useContext} from "react";
import GlobalContext from '../Contextes.jsx';

function PlayBoxDemo() {
  const {contextState : ctx} = useContext(GlobalContext);
  return <div id="demo-container">
    chosenArtist: null,
    chosenAlbum: null,
    playingSong: null,
    <audio src={`/artists/${ctx.chosenArtist}/${ctx.chosenAlbum}/${ctx.playingSong}`}/>
  </div>
}

export default PlayBoxDemo;